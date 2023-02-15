const {Pokemon} = require('../models')
const {Professor} = require('../models')
const {db} = require('../db/db')


async function seed(){
    await db.sync({
        force: true
    })
    
    await Pokemon.bulkCreate([
        {
            Name: "Vaporeon" ,
            Type: "Water",
            StageOfEvolution: "2/2",
            AttackStat: 65 ,
            DefenceStat: 60
            
        },
        {
            Name: "Infernape" ,
            Type: "Fire,Fighting",
            StageOfEvolution: "3/3",
            AttackStat: 104 ,
            DefenceStat: 71
        },
        {
            Name: "Luxray" ,
            Type: "Electric",
            StageOfEvolution: "3/3",
            AttackStat: 120 ,
            DefenceStat: 79
        },
        {
            Name: "Gengar" ,
            Type: "Ghost,Poision",
            StageOfEvolution: "3/3",
            AttackStat: 65 ,
            DefenceStat: 60
        },
        {
            Name: "Ralts" ,
            Type: "Psychic,Fairy",
            StageOfEvolution: "1/3",
            AttackStat: 25 ,
            DefenceStat: 25
        },
        {
            Name: "Machamp" ,
            Type: "Fighting",
            StageOfEvolution: "3/3",
            AttackStat: 130 ,
            DefenceStat: 80
        }
    ])


    await Professor.bulkCreate([
        {
            Username: 'Oak4Life',
            Password: 'RUBoyOrGirl?123',
            Role: 'Admin'
            
        },
        {
            Username: 'SycamoreLifeMorePokemon',
            Password: 'IlovePokemon123!',
        },
        {
            Username: 'JuniperBerry69',
            Password: 'Unova4Eva',
        },
    ])

}



module.exports = {seed}