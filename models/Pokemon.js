const { Sequelize, Model, DataTypes } = require('sequelize')
const {db} = require('../db/db')

class Pokemon extends Model {}

Pokemon.init({                                      //setting up the pokemon table to be seeded with data 
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StageOfEvolution: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AttackStat: {
        type: DataTypes.INTEGER,
    },
    DefenceStat: {
        type: DataTypes.INTEGER,
    }
}, {sequelize: db,
    modelName: 'Pokemon'})

module.exports = {Pokemon}