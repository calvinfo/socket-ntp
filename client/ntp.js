(function (root) {

  var ntp  = {}
    , offsets = []
    , socket;

  ntp.init = function (sock, options) {
    options = options || {};

    socket = sock;
    socket.on('ntp:server_sync', onSync);
    setInterval(sync, options.interval || 1000);
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
    var whee ="";
    offsetsSorted.sort(sort2dArray);

    if (offsetsSorted.length >4){ //get rid of everything except the 4 lowest ping times.
		    for (var i = 0; i < offsets.length-3; i++) {
		    offsetsSorted.pop();
		    }
    }
    for (var i = 0; i < offsetsSorted.length; i++) {
      sum += offsetsSorted[i][1];
		  whee = whee + " " + offsetsSorted[i][0];
	
		}
    sum /= offsetsSorted.length;
    console.log(whee);

    return sum;
  };


  var sync = function () {
    socket.emit('ntp:client_sync', { t0 : Date.now() });
  };
 
	 var sort2dArray = function (a, b) {
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
