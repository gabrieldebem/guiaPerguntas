const Sequelize = require('sequelize');
const conection = require('./database');

const Answers = conection.define('answer', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    askId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answers.sync({force: false}).then(() =>{
    console.log('Answers table has been created')
});

module.exports = Answers; 