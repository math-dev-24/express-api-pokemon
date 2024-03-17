const { Pokemon } = require('../../db/sequelize')
const auth = require('../../core/auth/auth')

module.exports = (app) => {
    app.get('/api/pokemon/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemons => {
                if(pokemons === null){
                    const message = `Le pokémon avec l\'identifiant ${req.params.id}, n\'existe pas.`
                    return res.status(404).json({message})
                }
                const message = 'Le pokemon a été récupéré'
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = `Le pokémon n\'a pas pu être récupéré. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            })
    })
}