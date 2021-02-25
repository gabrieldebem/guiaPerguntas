const Sequelize = require('sequelize');
const conection = new Sequelize('guia-db', 'root', 'gabi123',{
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = conection;