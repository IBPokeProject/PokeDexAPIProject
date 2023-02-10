const express = require("express")
const app = express()
const {db} = require ("../db/db")
const seed = require("../db/db")

app.use(express.json())
app.use("/Pokemon", pokemonRouter)
app.use("/Professor", professorRouter)


app.listen(3000, async () =>{
    await db.sync()
    seed()
    console.log("listening on port 3000")
})

module.exports = app