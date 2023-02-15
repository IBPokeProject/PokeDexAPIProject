const {Pokemon} = require("./Pokemon")
const {Professor} = require("./Professor")
const {db} = require("../db/db")


Pokemon.belongsTo(Professor, {foreignKey: 'profId'});
Professor.hasMany(Pokemon, {foreignKey: 'profId'});

module.exports = {Pokemon, Professor, db}