const {Pokemon} = require("./Pokemon")
const {Professor} = require("./Professor")
const {db} = require("../db/db")


Pokemon.belongsTo(Professor); // Pokemon table, there will be an profId <- FK
Professor.hasMany(Pokemon);

module.exports = {Pokemon, Professor, db}