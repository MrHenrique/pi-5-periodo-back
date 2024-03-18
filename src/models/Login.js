const { Model, DataTypes } = require("sequelize");

class Login extends Model {
    static init(sequelize) {
        super.init(
            {
                idLogin: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: "Login",
            },
        );
    }

    static associate(models) {
        this.belongsToMany(models.Fazenda, {
            foreignKey: "idLogin",
            through: "LoginFazenda",
            as: "Fazendas",
        });
    }
}

module.exports = Login;
