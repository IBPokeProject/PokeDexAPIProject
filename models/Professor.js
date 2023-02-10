const { Sequelize, Model, DataTypes } = require('sequelize')
const {db} = require('../db/db')

class Professor extends Model {}

Professor.init({
    Id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    Region: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Study: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {sequelize: db,
    modelName: 'Professor'})

module.exports = {Professor}