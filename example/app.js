
var http      = require('http')
  , express   = require('express')
  , socketio  = require('socket.io')
  , ntp       = require('../');


var app    = express()
  , server = http.createServer(app)
  , io     = socketio.listen(server);
io.set('log level', 1); // reduce logging

app.use(express.static(__dirname)); 
app.use('/client', express.static('../client/')); 

io.sockets.on('connection', ntp.sync);

server.listen(80);
