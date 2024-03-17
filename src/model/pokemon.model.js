module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemons', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom est déjà pris."
            },
            validate: {
                notEmpty: { msg: "Le name ne doit pas être vide !" },
                notNull: { msg: "Le name ne doit pas être null !" }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                notNull: { msg: "Les points de vie sont une propriété requise" },
                max: {
                    args: [999],
                    msg: "Les Hp doivent être inférieur à 999."
                },
                min: {
                    args: [0],
                    msg: "Les Hp doivent être supérieur ou égale à 0."
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les Cp.' },
                notNull: { msg: "Les Cp sont une propriété requise" },
                max: {
                    args: [99],
                    msg: "Les Cp doivent être inférieur à 99."
                },
                min: {
                    args: [0],
                    msg: "Les Cp doivent être supérieur ou égale à 0."
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: "L'image doit être au format Url" },
                notNull: { msg: "l'image est requise !" }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypeValid(value) {
                    if (!value) {
                        throw new Error('Un pokemon doit avoir au moins 1 type.')
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
                    }
                    validTypes = ['Poison', 'Insecte', 'Plante', 'Feu', "Eau", "Normal", "Vol", "Electrik"]
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
                        }
                    });
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: "created",
        updateAt: false
    })
}
