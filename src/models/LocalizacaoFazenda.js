const { Model, DataTypes } = require("sequelize");

class LocalizacaoFazenda extends Model {
    static init(sequelize) {
        super.init(
            {
                idLocalizacaoFazenda: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                longitude: DataTypes.INTEGER,
                latitude: DataTypes.INTEGER,
            },
            {
                sequelize,
                tableName: "LocalizacaoFazenda",
            },
        );
    }
}

module.exports = LocalizacaoFazenda;
