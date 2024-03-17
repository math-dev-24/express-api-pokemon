const express = require("express")
const bodyParser = require('body-parser')
const morgan = require("morgan")
const { initDb } = require("./src/db/sequelize")
const app = express()
const port = 3000

app.use(morgan('dev')).use(bodyParser.json())

//initDb()

//Get
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemon')(app)
//POST
require('./src/routes/createPokemon')(app)
//PUT
require("./src/routes/updatePokemon")(app)
//DELETE
require('./src/routes/deletePokemon')(app)



app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre url'
    res.status(404).json({message})
})


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))