const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemon', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Le pokémon ${pokemon.name} a bien été crée.`
                res.json({ message, data: pokemon })
            })
            .catch(e =>{
                if(e instanceof ValidationError){
                    return res.status(400).json({message: e.message})
                }
                if(e instanceof UniqueConstraintError){
                    return res.status(400).json({message: e.message})
                }
                const message  = 'Le pokémon n\'a pas pu être ajouté, Réessayer dans quelques instants.'
                res.status(500).json({message, data: e})
            })
    })
}