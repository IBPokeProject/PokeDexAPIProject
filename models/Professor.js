const { Sequelize, Model, DataTypes } = require('sequelize')
const {db} = require('../db/db')

class Professor extends Model {}

Professor.init({                        // setting up the professor table to be seeded with data
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