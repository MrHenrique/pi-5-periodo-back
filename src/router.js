const express = require("express");
const LoginController = require("./controllers/LoginController");
const FazendaController = require("./controllers/FazendaController");
const AreaController = require("./controllers/AreaController");
const LocalizacaoFazendaController = require("./controllers/LocalizacaoFazendaController");
const LocalizacaoAreaController = require("./controllers/LocalizacaoAreaController");
const TipoSensorController = require("./controllers/TipoSensorController");
const SensorController = require("./controllers/SensorController");
const DadosJsonController = require("./controllers/DadosJsonController");

const routes = express.Router();

//rotas Login
routes.get("/login", LoginController.showAll);
routes.get("/login/:idLogin", LoginController.show);
routes.post("/login", LoginController.create);
routes.patch("/login/:idLogin", LoginController.update);
routes.delete("/login/:idLogin", LoginController.delete);

//rotas Fazenda
routes.get("/fazenda", FazendaController.showAll);
routes.get("/fazenda/:idFazenda", FazendaController.show);
routes.post("/fazenda/:idLogin", FazendaController.create);
routes.patch("/fazenda/:idFazenda", FazendaController.update);
routes.delete("/fazenda/:idFazenda", FazendaController.delete);

//rotas Area
routes.get("/area", AreaController.showAll);
routes.get("/area/:idArea", AreaController.show);
routes.post("/area/:idFazenda", AreaController.create);
routes.patch("/area/:idArea", AreaController.update);
routes.delete("/area/:idArea", AreaController.delete);

//rotas LocalizacaoFazenda
routes.get("/localizacaoFazenda", LocalizacaoFazendaController.showAll);
routes.get(
    "/localizacaoFazenda/:idLocalizacaoFazenda",
    LocalizacaoFazendaController.show,
);
routes.post("/localizacaoFazenda", LocalizacaoFazendaController.create);
routes.patch(
    "/localizacaoFazenda/:idLocalizacaoFazenda",
    LocalizacaoFazendaController.update,
);
routes.delete(
    "/localizacaoFazenda/:idLocalizacaoFazenda",
    LocalizacaoFazendaController.delete,
);

//rotas LocalizacaoArea
routes.get("/localizacaoArea", LocalizacaoAreaController.showAll);
routes.get(
    "/localizacaoArea/:idLocalizacaoArea",
    LocalizacaoAreaController.show,
);
routes.post("/localizacaoArea", LocalizacaoAreaController.create);
routes.patch(
    "/localizacaoArea/:idLocalizacaoArea",
    LocalizacaoAreaController.update,
);
routes.delete(
    "/localizacaoArea/:idLocalizacaoArea",
    LocalizacaoAreaController.delete,
);

//rotas TipoSensor
routes.get("/tipoSensor", TipoSensorController.showAll);
routes.get("/tipoSensor/:numSensor", TipoSensorController.show);
routes.post("/tipoSensor", TipoSensorController.create);
routes.patch("/tipoSensor/:numSensor", TipoSensorController.update);
routes.delete("/tipoSensor/:numSensor", TipoSensorController.delete);

//rotas Sensor
routes.get("/sensor", SensorController.showAll);
routes.get("/sensor/:idSensor", SensorController.show);
routes.post("/sensor", SensorController.create);
routes.patch("/sensor/:idSensor", SensorController.update);
routes.delete("/sensor/:idSensor", SensorController.delete);
routes.delete("/sensor", SensorController.deleteTudo);

//rotas DadosJson
routes.get("/dadosJson", DadosJsonController.showAll);
routes.post("/dadosJson", DadosJsonController.create);
routes.delete("/dadosJson/:idDadosJson", DadosJsonController.delete);
routes.delete("/dadosJson", DadosJsonController.deleteTudo);

module.exports = routes;
