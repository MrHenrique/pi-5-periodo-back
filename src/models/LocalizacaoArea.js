const { Model, DataTypes } = require("sequelize");

class LocalizacaoArea extends Model {
    static init(sequelize) {
        super.init(
            {
                idLocalizacaoArea: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                longitude: DataTypes.INTEGER,
                latitude: DataTypes.INTEGER,
            },
            {
                sequelize,
                tableName: "LocalizacaoArea",
            },
        );
    }
}

module.exports = LocalizacaoArea;
