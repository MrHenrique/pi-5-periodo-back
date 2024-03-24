const { Model, DataTypes } = require("sequelize");

class TipoSensor extends Model {
    static init(sequelize) {
        super.init(
            {
                numSensor: {
                    type: DataTypes.SMALLINT,
                    primaryKey: true,
                    autoIncrement: false,
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
