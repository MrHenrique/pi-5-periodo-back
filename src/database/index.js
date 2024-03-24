const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Login = require("../models/Login");
const Fazenda = require("../models/Fazenda");
const Area = require("../models/Area");
const LocalizacaoFazenda = require("../models/LocalizacaoFazenda");
const LocalizacaoArea = require("../models/LocalizacaoArea");
const TipoSensor = require("../models/TipoSensor");
const Sensor = require("../models/Sensor");
const DadosJson = require("../models/DadosJson");

const connection = new Sequelize(dbConfig);

Login.init(connection);
Fazenda.init(connection);
Area.init(connection);
LocalizacaoFazenda.init(connection);
LocalizacaoArea.init(connection);
TipoSensor.init(connection);
Sensor.init(connection);
DadosJson.init(connection);


Login.associate(connection.models);
Fazenda.associate(connection.models);
Area.associate(connection.models);
Sensor.associate(connection.models);

module.exports = connection;
