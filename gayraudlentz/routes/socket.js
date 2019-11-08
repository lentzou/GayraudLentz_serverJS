const io = require('socket.io');

const server = io.listen(8000);

server.on('connection', (socket) => {
  console.info(`Client connected [id=${socket.id}]`);

  socket.on('pseudo', (pseudo) => {
    console.info(`Pseudo : ${pseudo}`);
  });

  socket.emit('newConnection', 'Vous êtes bien connecté !');
  socket.broadcast.emit('newConnection', 'Un autre client vient de se connecter !');

  socket.on('generalMessage', ({ message, id, username }) => {
    console.log(message)
    socket.broadcast.emit('generalMessage', { message, username });
  });

  socket.on('roomMessage', ({ message, id, username, room }) => {
    console.log(room)
    console.log("message " + message)
    server.in(room).emit('roomMessage', { message, username, room });
  });

  socket.on('room', function (room) {
    console.log("CONNECTED TO ROOM" + room)
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.info(`Client gone [id=${socket.id}]`);
  });
});
