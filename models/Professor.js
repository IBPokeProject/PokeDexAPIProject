const { Sequelize, Model, DataTypes } = require('sequelize')
const {db} = require('../db/db')

class Professor extends Model {}

Professor.init({                        // setting up the professor table to be seeded with data
    Id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {                                                 
        type: DataTypes.STRING,
        allowNull: false 
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Role: {
        type: DataTypes.STRING,
    }
}, {sequelize: db,
    modelName: 'Professor'})

module.exports = {Professor}