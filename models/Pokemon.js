const { Sequelize, Model, DataTypes } = require('sequelize')
const {db} = require('../db/db')

class Pokemon extends Model {}

Pokemon.init({                                      //setting up the pokemon table to be seeded with data 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    evolution: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attack: {
        type: DataTypes.INTEGER,
    },
    defence: {
        type: DataTypes.INTEGER,
    }
}, {sequelize: db,
    modelName: 'Pokemon'})

module.exports = {Pokemon}