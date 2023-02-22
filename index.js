const express = require("express")
const app = express()
const {db} = require ("./db/db")
const {seed} = require("./db/seed")
const { Professor, Pokemon } = require ("./models")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const { OPEN_READWRITE } = require("sqlite3")

require("dotenv").config()
const SALT_COUNT = 5;


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const JWTtoken = process.env.SECRET

app.get("/", async (req,res) => {
    res.send("<h1>Welcome to Oak's Pokedex!<h1><h2>Login to Oak's Pokedex using /login, Or if you're a new scientist here use /register<h2><p>Happy Catching!<p>")
})

// What can a user do?
// - Post a new pokemon [X]
// - Delete their pokemon [X]
// - Update their pokemon [X]
// - See their pokemon [X]
// What can an admin do?
// - Post a new pokemon [X]
// - Delete ALL pokemon [X]
// - Update ALL pokemon [X]
// - See ALL pokemon [X]


// Middleware function to authorise and set req.user as user
const setProfessor = async (req, res, next) => {
    const auth = req.header('Authorization')       // 
    if(!auth){
        return res.sendStatus(401)
    }
    else {
        try {
            const [, token] = auth.split(" ")
            const user = jwt.verify(token, JWTtoken)
            req.user = user
            next()
        } catch(error) {
            return res.sendStatus(401)
        }
    }
}
// Register endpoint
app.post('/register', async (req, res) => {
    // Gets the username and password
    const {username, password} = req.body
    // Hash the password and create a new user with that password
    const hash = await bcrypt.hash(password, SALT_COUNT)
    const user = await Professor.create({username, password: hash})
    // Generate a token for the user
    const token = jwt.sign({id: user.id, username: user.username}, JWTtoken);
    res.send({message: "Go catch them all!", token})
})

// Login endpoint
app.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const user = await Professor.findOne({where: {username}})
    const hashResult = await bcrypt.compare(password, user.password)
    if (!hashResult) {
        res.sendStatus(401)
    } else {
        // const payload = {id: user.id, username: user.username}
        const token = jwt.sign({id: user.id, username: user.username}, JWTtoken)
        res.status(200).send({ message: "Welcome back Professor!", token })
    }
})

// Set the new pokemon added with the specific profId
app.post('/pokemon', setProfessor, async(req, res, next) => {
    if (!req.user){
        res.sendStatus(401)
    }
    else{
        const {name, type, evolution, attack, defence} = req.body
        const pokemon = await Pokemon.create({name, type, evolution, attack, defence, profId: req.user.id})
        res.send({id: pokemon.id, name: pokemon.name, type: pokemon.type, evolution: pokemon.evolution, attack: pokemon.attack, defence: pokemon.defence})
    }
})


// Only same profId or Admin can delete their own added pokemon [X]
app.delete('/pokemon/:id', setProfessor, async (req, res, next) => {
    const pokemon = await Pokemon.findByPk(req.params.id);
    const isAdminUser = await isAdmin(req.user.id);
  
    if (isAdminUser || req.user.id === pokemon.profId) {
      await pokemon.destroy();
      res.send({ message: 'Farewell Pokemon!' });
    } else {
      res.sendStatus(401);
    }
  });

// Update a pokemon that belongs to specific Id or update all pokemon if admin
  app.put('/update', setProfessor, async (req, res, next) => {
    if (!req.user) {
      res.sendStatus(401);
    } else {
      const { id, name, attack, defence, evolution, type } = req.body;
      const professorId = req.user.id;
      const isAdminUser = await isAdmin(professorId);
  
      if (isAdminUser) { // if user is an admin, they can update all Pokemon
        const pokemon = await Pokemon.findByPk(id);
        if (pokemon) {
          pokemon.name = name;
          pokemon.attack = attack;
          pokemon.defence = defence;
          pokemon.evolution = evolution;
          pokemon.type = type;
          await pokemon.save();
          res.status(200).json({ message: 'Pokemon updated successfully' });
        } else {
          res.status(404).json({ error: 'Pokemon not found' });
        }
      } else { // if user is not an admin, they can only update their own Pokemon
        const pokemon = await Pokemon.findOne({
          where: { id, profId: professorId },
        });
        if (pokemon) {
          pokemon.name = name;
          pokemon.attack = attack;
          pokemon.defence = defence;
          pokemon.evolution = evolution;
          pokemon.type = type;
          await pokemon.save();
          res.status(200).json({ message: 'Pokemon updated successfully' });
        } else {
          res.status(404).json({ error: 'Pokemon not found or you are not authorized to update it' });
        }
      }
    }
  });
  

// Get all Pokemon belonging to the specific profId or all Pokemon if user is admin [X]
app.get('/pokemon/view', setProfessor, async (req, res, next) => {
    if (!req.user) {
      res.sendStatus(401);
    } else {
      if (await isAdmin(req.user.id)) { // check if user is an admin
        const pokemon = await Pokemon.findAll();
        res.status(200).json(pokemon);
      } else { // if not an admin, return Pokemon belonging to profId
        const professorId = req.user.id;
        const pokemon = await Pokemon.findAll({
          where: { profId: professorId },
        });
        res.status(200).json(pokemon);
      }
    }
  });
  
  
// Reading all Professors from the database
app.get("/professor", async (req, res) => {
    const professor = await Professor.findAll()
    res.send(professor)
})


app.listen(3001, async () =>{
    await db.sync()
    seed() 
    console.log(process.env.SECRET);               // Listening on port 3000
    console.log("listening on port 3001")
})

module.exports = {app}




  