import Server from 'socket.io';

var port = process.env.PORT || 8090

export function startServer(store) {
  const io = new Server().attach(port);
  console.log("http server listening on %d", port)

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

}
