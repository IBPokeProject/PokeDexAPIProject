const {Pokemon, Professor} = require("../models")
const {db} = require("./db")


Pokemon.belongsTo(Professor, {foreignKey: 'profId'}); // Pokemon table, there will be an profId <- FK
Professor.hasMany(Pokemon);

module.exports = {Pokemon, Professor}