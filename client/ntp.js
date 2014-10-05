(function (root) {

	var ntp  = {}
	, offsets = []
	, socket;

	ntp.init = function (sock) {
		socket = sock;
		socket.on('ntp:server_sync', onSync);
		sync();
	};

	var onSync = function (data) {

		var diff = Date.now() - data.t1 - ((Date.now() - data.t0)/2);
		var ping = Date.now() - data.t0;
		offsets.unshift([ping,diff]);

		if (offsets.length > 20){
			offsets.pop();
		}

	};

	ntp.offset = function () {
		var sum = 0;
		var offsetsSorted = offsets.slice(0); //make a copy of the offsets array for sorting.  Keep the original so the times keep cycling.
		offsetsSorted.sort(sort2dArray);

		if (offsetsSorted.length >4){ //get rid of everything except the 4 lowest ping times.
			for (var i = 0; i < offsets.length-3; i++) {
				offsetsSorted.pop();
			}
		}
		for (var i = 0; i < offsetsSorted.length; i++) { //add up and average the 4 offset times associated with the lowest ping times
			sum += offsetsSorted[i][1];
		}

		sum /= offsetsSorted.length;
		return sum;
	};

	ntp.serverTime = function () {
		return Math.round(Date.now() -ntp.offset());
	};

	var sync = function () {
		socket.emit('ntp:client_sync', { t0 : Date.now() });
		//console.log(ntp.offset() + " is the current offset");
		if (offsets.length <19){ //every second for the first 20, every 5 after.  To reduce network traffic.
			setTimeout(function(){sync();}, 1000)
		}	else{
			setTimeout(function(){sync();}, 5000)
		}
	};

	var sort2dArray = function (a, b) { //for sorting the 2d array by ping time
		if (a[0] === b[0]) {
			return 0;
		}
		else {
			return (a[0] < b[0]) ? -1 : 1;
		}
	}

	// AMD/requirejs
	if (typeof define === 'function' && define.amd) {
		define('ntp', [], function () {
			return ntp;
		});
	} else {
		root.ntp = ntp;
	}

})(window);
