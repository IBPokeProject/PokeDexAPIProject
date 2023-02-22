const {Pokemon} = require('../models')
const {Professor} = require('../models')
const {db} = require('../db/db')
const bcrypt = require('bcrypt')

async function seed(){
    await db.sync({
        force: true
    })
    
    await Pokemon.bulkCreate([
        {
            name: "Vaporeon" ,
            type: "Water",
            evolution: "2/2",
            attack: 65 ,
            defence: 60
            
        },
        {
            name: "Infernape" ,
            type: "Fire,Fighting",
            evolution: "3/3",
            attack: 104 ,
            defence: 71
        },
        {
            name: "Luxray" ,
            type: "Electric",
            evolution: "3/3",
            attack: 120 ,
            defence: 79
        },
        {
            name: "Gengar" ,
            type: "Ghost,Poision",
            evolution: "3/3",
            attack: 65 ,
            defence: 60
        }
    ])

    const hash = await bcrypt.hash('ILovePokemon123', 5)
    await Professor.bulkCreate([
        {
            username: 'Oak4Life',
            password: hash,
            role: 'Admin'
        },
    ])
 }
 


module.exports = {seed}