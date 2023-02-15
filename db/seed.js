const {Pokemon} = require('../models')
//  const {Professor} = require('../models')
const {db} = require('../db/db')


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


//     await Professor.bulkCreate([
//         {
//             Username: 'Oak4Life',
//             Password: 'RUBoyOrGirl?123',
//             Role: 'Admin'
            
//         },
//         {
//             Username: 'SycamoreLifeMorePokemon',
//             Password: 'IlovePokemon123!',
//         },
//         {
//             Username: 'JuniperBerry69',
//             Password: 'Unova4Eva',
//         },
//     ])

 }



module.exports = {seed}