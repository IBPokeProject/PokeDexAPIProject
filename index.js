const express = require("express")
const app = express()
const {db} = require ("./db/db")
const {seed} = require("./db/seed")
const { Professor, Pokemon } = require ("./models")
const bcrypt = require("bcrypt");
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const JWTtoken = process.env.SECRET

app.put("/", async (req,res) => {
    res.send("<h1>Welcome to Oak's Pokedex!<h1><h2>Login to Oak's Pokedex using /login, Or if you're a new scientist here use /register<h2><p>Happy Hunting!<p>")
})


app.get("/professor", async (req, res) => {       // Reading all Professors from the database
    const professor = await Professor.findAll()
    res.send(professor)
})

app.delete("/professor/delete/:deleteid", async (req, res) => {
    const requestedDelete = await Professor.findByPk(req.params.deleteid)    //Deleting Professors from the Database
    await requestedDelete.destroy()
    res.status(200).send("Sucessfully deleted professor")
})


app.get("/pokemon", async (req, res) => {
    const pokemon = await Pokemon.findAll()         // Reading all Pokemon from the database
    res.send(Pokemon)
})


app.delete("/pokemon/delete/:deleteid", async (req, res) => {
    const requestedDelete = await Pokemon.findByPk(req.params.deleteid)    //Deleting Pokemon from the Database
    await requestedDelete.destroy()
    res.status(200).send("Sucessfully deleted pokemon")
})

// app.put("/update/:updateid", async (req, res) => {
//     const requestedUpdate = await Professor.findByPk(req.params.updateid)    //editing entries in the database
//     await requestedUpdate.update({status: req.params.status})
//     res.send(200).send("successfully updated")
// })

// update -> name, study, region, or pokemon id linked to it
//  two updates? one will be like /update/pokemon/:id
//  /update/:const <- name study region
//  if re.params.const == name, update name w/ body?
// if not then update region or study with the body

app.listen(3000, async () =>{
    await db.sync()
    seed() 
    console.log(process.env.SECRET);                     // Listening on port 3000
    console.log("listening on port 3000")
})

module.exports = {app}