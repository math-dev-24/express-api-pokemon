const { Sequelize, DataTypes } = require("sequelize");
const pokemonModel = require("../model/pokemon.model");


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

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create(pokemon).then(pokemon => console.log(pokemon.toJSON()))
        })
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon
}