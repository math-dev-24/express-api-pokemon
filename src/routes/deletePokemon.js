const { Pokemon } = require("../db/sequelize")

module.exports = (app) => {
    app.delete('/api/pokemon/:id', (req,res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            if(pokemon === null){
                const message = `Pokemon avec l'id ${req.params.id} introuvable.`
                return res.status(404).json({message})
            }
            const pokemonDelete = pokemon
            Pokemon.destroy({
                where: {id: pokemonDelete.id}
            }).then(_ => {
                const message = `Le pokemon ${pokemonDelete.name} a bien été supprimé`
                res.json({message, data: pokemonDelete})
            })
            .catch(e => {
                const message = `Erreur lors de la supresion du pokemon : ${pokemon.name}`
                res.status(500).json({message})
            })
        })
    })
}