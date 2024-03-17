const express = require("express")
const bodyParser = require('body-parser')
const morgan = require("morgan")
const { initDb } = require("./src/db/sequelize")
const app = express()
const port = 3000

app.use(morgan('dev')).use(bodyParser.json())

//initDb()

//Get
require('./src/routes/pokemon/findAllPokemons')(app)
require('./src/routes/pokemon/findPokemon')(app)
//POST
require('./src/routes/pokemon/createPokemon')(app)
require('./src/routes/user/login')(app)
//PUT
require("./src/routes/pokemon/updatePokemon")(app)
//DELETE
require('./src/routes/pokemon/deletePokemon')(app)



app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre url'
    res.status(404).json({message})
})


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))