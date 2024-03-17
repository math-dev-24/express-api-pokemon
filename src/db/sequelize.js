const { Sequelize, DataTypes } = require("sequelize");
const pokemonModel = require("../model/pokemon.model");
const userModel = require('../model/user.model');
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize(
    {
        username: "root",
        password: "Warolucky24",
        database: "pokedex",
        host: "localhost",
        dialect: "mysql"
    }
)

const Pokemon = pokemonModel(sequelize, DataTypes)
const User = userModel(sequelize, DataTypes)


const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        console.log('Initialisation de la data')

        pokemons.map(pokemon => {
            Pokemon.create(pokemon)
        })

        bcrypt.hash('pikachu', 10).then(hash => {
            User.create({
                username: "pikachu",
                password: hash
            })
        })
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon, User
}