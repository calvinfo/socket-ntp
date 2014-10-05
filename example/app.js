
var http      = require('http')
  , express   = require('express')
  , socketio  = require('socket.io')
  , ntp       = require('../');

var app    = express()
  , server = http.createServer(app)
  , io     = socketio.listen(server);
DEBUG=''; //turn off heartbeat messages, socket.io 1.10 and later

app.use(express.static(__dirname)); 
app.use('/client', express.static('../client/')); 

io.sockets.on('connection', ntp.sync);

server.listen(80);

console.log ("Starting application on *:80");

