const { Model, DataTypes } = require('sequelize')
const db = require('../db/db')

class Pokemon extends Model {}

Pokemon.init({
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
}, {sequlize: db})

module.exports = {Pokemon}