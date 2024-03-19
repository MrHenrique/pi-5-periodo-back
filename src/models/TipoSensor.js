const { Model, DataTypes } = require("sequelize");

class TipoSensor extends Model {
    static init(sequelize) {
        super.init(
            {
                numSensor: {
                    type: DataTypes.CHAR(3),
                    primaryKey: true,
                    autoIncrement: true,
                },
                nomeTipoSensor: DataTypes.STRING,
                obs: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: "TipoSensor",
            },
        );
    }
}

module.exports = TipoSensor;
