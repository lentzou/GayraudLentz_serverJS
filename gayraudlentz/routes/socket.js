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
    console.info(`${username} me parle ! Il me dit : ${message}`);
    socket.broadcast.emit('generalMessage', { message, username });
  });

  socket.on('disconnect', () => {
    console.info(`Client gone [id=${socket.id}]`);
  });
});
