socket-ntp
==========

NTP Sync using Socket.io. Allows you to sync clients against a server by calculating the time offset.

## Installation

```
npm install socket-ntp
```
Requires access to [socket.io](http://socket.io/) connections on both the client and the server.

## Client usage

On the client, include:

```html
<script src="/javascripts/libs/socket.io.min.js"></script>
<script src="/client/ntp.js"></script>
```

```javascript

  var socket = io.connect();
  ntp.init(socket);  

  var offset = ntp.offset(); // time offset from the server in ms 
```

## Server usage

From anywhere that you have access to a socket.io instance.

```javascript
var ntp = require('socket-ntp');

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