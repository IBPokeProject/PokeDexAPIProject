const { Sequelize, Model, DataTypes } = require('sequelize')
const {db} = require('../db/db')

class Professor extends Model {}

Professor.init({                   // setting up the professor table to be seeded with data
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {                                                 
        type: DataTypes.STRING,
        allowNull: false 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "Assistant",
    }
}, {sequelize: db,
    modelName: 'Professor'})

module.exports = {Professor}