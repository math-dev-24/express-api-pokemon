const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../core/auth/private_key')


module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } })
            .then(user => {
                if (!user) {
                    const message = "L'utilisateur demandé n'existe pas";
                    return res.status(400).json({ message })
                }

                bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                    if (!isPasswordValid) {
                        return res.status(400).json({ message: "Le mot de passe est incorrect" })
                    }

                    const token = jwt.sign(
                        {userId: user.id},
                        privateKey,
                        {expiresIn: '24h'}
                    )

                    const message = `L'utilisateur a été connecté avec succès`;
                    return res.json({ message, data: user, token })
                })
            })
            .catch(e => {
                const message = `Réessayer dans quelques instants.`
                return res.status(400).json({message, data: e})
            })
    })
}