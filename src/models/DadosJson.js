const { Model, DataTypes } = require("sequelize");

class DadosJson extends Model {
    static init(sequelize) {
        super.init(
            {
                idDadosJson: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                    autoIncrement: false,
                },
                valorDados: DataTypes.STRING,

            },
            {
                sequelize,
                tableName: "DadosJson",
            },
        );
    }

    static associate(models) {
        this.belongsTo(models.Sensor, {
            foreignKey: "idSensor",
            as: "Sensor",
        });
    }
}

module.exports = DadosJson;
