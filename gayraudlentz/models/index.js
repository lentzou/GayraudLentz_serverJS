
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const
    io = require("socket.io"),
    server = io.listen(8000);

server.on("connection", (socket) => {  
  console.info(`Client connected [id=${socket.id}]`);

  socket.emit('newConnection', 'Vous êtes bien connecté !');
  socket.broadcast.emit('newConnection', 'Un autre client vient de se connecter !');

	socket.on('generalMessage', function (message) {
    console.info('Un client me parle ! Il me dit : ' + message);
    socket.broadcast.emit('generalMessage', message);
  });	
    
  socket.on("disconnect", () => {      
      console.info(`Client gone [id=${socket.id}]`);
  });
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
