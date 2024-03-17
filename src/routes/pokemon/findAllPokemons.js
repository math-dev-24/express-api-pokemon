const { Pokemon } = require('../../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../../core/auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        const limit = parseInt(req.query.limit) || 100000
        const name = req.query.name

        if (name) {
            if (name.length < 2) {
                return res.status(400).json({ message: "Le terme de recherche doit contenir au minimum 2 caractères." })
            }
            return Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                order: ['name'],
                limit
            })
                .then(({ count, rows }) => {
                    const message = `Il existe ${count} qui correspond au terme de recherche ${name}`
                    res.json({ message, data: rows })
                })
        }
        Pokemon.findAll({ order: ['name'] })
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.'
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = `La liste des pokémons n'a pas pu être récupérée. Réessayer dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
    })
}