const Sequelize = require('sequelize');
const conection = require('./database');

const ask = conection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

ask.sync({force: false}).then(()=> {
})

module.exports = ask