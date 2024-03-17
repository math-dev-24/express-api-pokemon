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
            validate: {
                notEmpty: {msg: "Le name ne doit pas être vide !"},
                notNull: {msg: "Le name ne doit pas être null !"}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
                notNull : {msg: "Les points de vie sont une propriété requise"}
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour les Cp.'},
                notNull: {msg: "Les Cp sont une propriété requise"}
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: "L'image doit être au format Url"},
                notNull: {msg: "l'image est requise !"}
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
            }
        }},{
            timestamps: true,
            createdAt: "created",
            updateAt: false
        })
}
