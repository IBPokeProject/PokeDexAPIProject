const path = require('path');
const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'oaksPokedex.sqlite'),
    logging: false
});

module.exports = 
    {db}
;



