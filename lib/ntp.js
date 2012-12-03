

/**
 * Sets up handlers to properly respond to client sync messages
 * @param  {[type]} socket [description]
 * @return {[type]}        [description]
 */
exports.sync = function (socket) {

  // should never be called, but ensure that there is not existing
  // handler
  if (socket.listeners('ntp:client_sync') > 0)
    return;

  socket.on('ntp:client_sync', function (data) {

    socket.emit('ntp:server_sync', { t1     : Date.now(),
                                     t0     : data.t0 });
  });
};