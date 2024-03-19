const { Model, DataTypes } = require("sequelize");

class Sensor extends Model {
    static init(sequelize) {
        super.init(
            {
                idSensor: {
                    type: DataTypes.SMALLINT,
                    primaryKey: true,
                    autoIncrement: true,
                },
            },
            {
                sequelize,
                tableName: "Sensor",
            },
        );
    }

    static associate(models) {
        this.belongsTo(models.TipoSensor, {
            foreignKey: "numSensor",
            as: "numTipoSensor",
        });
        this.belongsTo(models.Area, {
            foreignKey: "idArea",
            as: "AreaFazenda",
        });
        this.belongsTo(models.Area, {
            foreignKey: "idFazenda",
            as: "Fazenda"
        });
    }
}

module.exports = Sensor;
