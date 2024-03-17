const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Login = require("../models/Login");
const Fazenda = require("../models/Fazenda");
const Area = require("../models/Area");
const LocalizacaoFazenda = require("../models/LocalizacaoFazenda");
const LocalizacaoArea = require("../models/LocalizacaoArea");

const connection = new Sequelize(dbConfig);

Login.init(connection);
Fazenda.init(connection);
Area.init(connection);
LocalizacaoFazenda.init(connection);
LocalizacaoArea.init(connection);

Login.associate(connection.models);
Fazenda.associate(connection.models);
Area.associate(connection.models);

module.exports = connection;
