const {Pokemon, Professor} = require("../models")
const db = require("./db")


async function seed(){
    await db.sync({
        force: true
    })
}

await Pokemon.bulkCreate([
    {
        Name: "Vaporeon" ,
        Type: "Water",
        StageOfEvolution: "2/2",
        AttackStat: 65 ,
        DefenseStat: 60
        
    },
    {
        Name: "Infernape" ,
        Type: "Fire,Fighting",
        StageOfEvolution: "3/3",
        AttackStat: 104 ,
        DefenseStat: 71
    },
    {
        Name: "Luxray" ,
        Type: "Electric",
        StageOfEvolution: "3/3",
        AttackStat: 120 ,
        DefenseStat: 79
    },
    {
        Name: "Gengar" ,
        Type: "Ghost,Poision",
        StageOfEvolution: "3/3",
        AttackStat: 65 ,
        DefenseStat: 60
    },
    {
        Name: "Ralts" ,
        Type: "Psychic,Fairy",
        StageOfEvolution: "1/3",
        AttackStat: 25 ,
        DefenseStat: 25
    },
    {
        Name: "Machamp" ,
        Type: "Fighting",
        StageOfEvolution: "3/3",
        AttackStat: 130 ,
        DefenseStat: 80
    }
])


await Professor.bulkCreate([
    {
        Name: 'Samuel Oak',
        Region: 'Kanto',
        Study: 'The Study of Relationships Between People and Pokémon'
        
    },
    {
        Name: 'Augustine Sycamore',
        Region: 'Kalos',
        Study: 'The Study of Mega Evolution'
    },
    {
        Name: 'Aurea Juniper',
        Region: 'Unova',
        Study: 'The Study of the Origins of Pokemon'
    },
])

module.exports = seed