const express = require("express")
const app = express()
const {db} = require ("./db/db")
const {seed} = require("./db/seed")
const { Professor, Pokemon } = require ("./models")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config()
const SALT_COUNT = 5;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const JWTtoken = process.env.SECRET

app.put("/", async (req,res) => {
    res.send("<h1>Welcome to Oak's Pokedex!<h1><h2>Login to Oak's Pokedex using /login, Or if you're a new scientist here use /register<h2><p>Happy Catching!<p>")
})

// Middleware function to authorise and set req.user as user
const setProfessor = async (req, res, next) => {
    const auth = req.header('Authorization')
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
    const user = await User.create({username, password: hash})
    // Generate a token for the user
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWTtoken);
    res.send({message: "Go catch them all!", token})
})

// Login endpoint
app.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({where: {username}})
    const hashResult = await bcrypt.compare(password, user.password)
    if (!hashResult) {
        res.sendStatus(401)
    } else {
        // const payload = {id: user.id, username: user.username}
        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWTtoken)
        res.status(200).send({ message: "Welcome back Professor!", token })
    }
})

// Set the new pokemon added with the specific profId
app.post('/pokemon', setProfessor, async(req, res, next) => {
    if (!req.user){
        res.sendStatus(401)
    }
    else {
        const {Name, Type, StageOfEvolution, AttackStat, DefenceStat} = req.body
        const pokemon = await Pokemon.create({Name, Type, StageOfEvolution, AttackStat, DefenceStat, profId: req.user.Id})
        res.send({Id: pokemon.Id, Name: pokemon.Name, Type: pokemon.Type, StageOfEvolution: pokemon.StageOfEvolution, AttackStat: pokemon.AttackStat, DefenceStat: pokemon.DefenceStat})
    }
})
























// app.get("/professor", async (req, res) => {       // Reading all Professors from the database
//     const professor = await Professor.findAll()
//     res.send(professor)
// })

// app.delete("/professor/delete/:deleteid", async (req, res) => {
//     const requestedDelete = await Professor.findByPk(req.params.deleteid)    //Deleting Professors from the Database
//     await requestedDelete.destroy()
//     res.status(200).send("Sucessfully deleted professor")
// })

// app.post("/professor/add",async (req, res) => {
//     try{
//         const professor = await Professor.create(req.body)
//         res.status(200).send({user})
//     } catch(error) {
//         res.status(500).send(error)
//     }
// })

// app.get("/pokemon", async (req, res) => {
//     const pokemon = await Pokemon.findAll()         // Reading all Pokemon from the database
//     res.send(Pokemon)
// })

// app.delete("/pokemon/delete/:deleteid", async (req, res) => {
//     const requestedDelete = await Pokemon.findByPk(req.params.deleteid)    //Deleting Pokemon from the Database
//     await requestedDelete.destroy()
//     res.status(200).send("Sucessfully deleted pokemon")
// })

// // app.put("/update/:updateid", async (req, res) => {
// //     const requestedUpdate = await Professor.findByPk(req.params.updateid)    //editing entries in the database
// //     await requestedUpdate.update({status: req.params.status})
// //     res.send(200).send("successfully updated")
// // })

// // update -> name, study, region, or pokemon id linked to it
// //  two updates? one will be like /update/pokemon/:id
// //  /update/:const <- name study region
// //  if re.params.const == name, update name w/ body?
// // if not then update region or study with the body

app.listen(3000, async () =>{
    await db.sync()
    seed() 
    console.log(process.env.SECRET);                     // Listening on port 3000
    console.log("listening on port 3000")
})

module.exports = {app}