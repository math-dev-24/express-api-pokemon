const { ValidationError } = require('sequelize')
const { Pokemon } = require("../db/sequelize")


module.exports = (app) => {
    app.put("/api/pokemon/:id", (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: {id: id}
        })
        .then(_ => {
            Pokemon.findByPk(id).then(pokemon => {
                if(pokemon === null){
                    const message = `Le pokemon demandé n\'existe pas. Réessayer avec un autre identifiant`
                    return res.status(404).json({message})
                }
                const message = `Le pokemon ${pokemon.name} est bien mis à jour`
                res.json({message, data: pokemon})
            })
            .catch(e => {            
                const message = "Impossible de mettre à jour le pokemon."
                res.status(500).json({message, data: e})
            }) 
        }).catch(e => {
            if(e instanceof ValidationError){
                return res.status(400).json({message: e.message})
            }
            const message = "Impossible de mettre à jour le pokemon."
            res.status(500).json({message, data: e})
        })
    })
}