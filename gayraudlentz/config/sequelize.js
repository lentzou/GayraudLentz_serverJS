const Sequelize = require('sequelize');
let db;

if (process.env.ENV_NODE ===  "prod") {
    db = 'database_prod'
} else if (process.env.ENV_TEST === "test") {
    db = 'database_test'
} else {
    db = 'database_development'
}

const sequelize = new Sequelize(
    db, 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
  });

module.exports =  sequelize;
