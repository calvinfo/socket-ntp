
var fs        = require('fs')
  , path      = require('path')
  , http      = require('http')
  , express   = require('express')
  , socketio  = require('socket.io')
  , ntp       = require('../');


var app    = express()
  , server = http.createServer(app)
  , io     = socketio.listen(server);


app.get('/', function (req, res) {

  var file = path.resolve(__dirname, './index.html');

  fs.createReadStream(file).pipe(res);
});


app.get('/client/:filename', function (req, res, next) {

  debugger;

  var filename = req.param('filename')
    , filepath = path.resolve(__dirname, '../client/', filename);

  fs.exists(filepath, function (exists) {

    if (exists)
      fs.createReadStream(filepath).pipe(res);
    else
      res.send(404, 'Page not found!');
  });
});


io.sockets.on('connection', ntp.sync);


server.listen(3000);
