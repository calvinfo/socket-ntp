socket-ntp-krcmod
==========

NTP Sync using Socket.io.  Provides current time on webserver as well as the client offset from the webserver.

My take on Calvin French-Owen (calvinfo)'s concise socket-ntp.  Can be used as a drop-in replacement.  

I used the basic framework and made it needlessly more complicated :)

* Lower ping times are valued over higher since there's less chance of error in the NTP calculation
* Interrogates strong for 20 seconds, then throttles back to preserve resources
* added ntp.serverTime() for us lazybones
* Demo: Streamlined the express code. Added a primitive scheduler for synchronizing events across multiple nodes
* Demo: Socket.io client switched to the one automatically served by socket.io
* Demo: We didn't really need jQuery in there


## Installation

```
npm install socket-ntp-krcmod
```
Requires access to [socket.io](http://socket.io/) connections on both the client and the server.


## Client usage

On the client, include:

```html
<script src="/socket.io/socket.io.js"></script>
<script src="/client/ntp.js"></script>
```

```javascript

  var socket = io.connect();
  ntp.init(socket);  

  var offset = ntp.offset(); // time offset from the server in ms
  var servertime = ntp.serverTime(); //what time is it on the server (equivalent to Date.now())
```

## Server usage

From anywhere that you have access to a socket.io instance.

```javascript
var ntp = require('socket-ntp-krcmod');

io.sockets.on('connection', function (socket) {
  ntp.sync(socket);
});
```

## Demo

To start the demo run:

```
node example/app.js
```

### License

(The MIT License)

Copyright (c) 2012 Calvin French-Owen &lt;calvin@calv.info&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
