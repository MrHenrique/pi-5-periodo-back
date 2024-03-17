const { Model, DataTypes } = require("sequelize");

class Area extends Model {
    static init(sequelize) {
        super.init(
            {
                idArea: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nomeArea: DataTypes.STRING,
                tamanho: DataTypes.FLOAT,
            },
            {
                sequelize,
                tableName: "Area",
            },
        );
    }

    static associate(models) {
        this.belongsTo(models.Fazenda, {
            foreignKey: "idFazenda",
            as: "Fazenda",
        });
        this.belongsTo(models.LocalizacaoArea, {
            foreignKey: "idLocalizacaoArea",
            as: "LocalizacaoFazenda",
        });
    }
}

module.exports = Area;
