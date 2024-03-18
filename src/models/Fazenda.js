const { Model, DataTypes } = require("sequelize");

class Fazenda extends Model {
    static init(sequelize) {
        super.init(
            {
                idFazenda: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nomeFazenda: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: "Fazenda",
            },
        );
    }

    static associate(models) {
        this.belongsToMany(models.Login, {
            foreignKey: "idFazenda",
            through: "LoginFazenda",
            as: "Logins",
        });
        this.belongsTo(models.LocalizacaoFazenda, {
            foreignKey: "idLocalizacaoFazenda",
            as: "LocalizacaoFazenda",
        });
        this.hasMany(models.Area, {
            foreignKey: "idFazenda",
            as: "Areas",
        });
    }
}

module.exports = Fazenda;
