const { DataTypes } = require("sequelize")
//const { default: ModelManager } = require("sequelize/types/model-manager")

module.exports = (sequelize) => {
    sequelize.define("genre", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}
