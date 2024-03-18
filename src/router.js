const express = require("express");
const LoginController = require("./controllers/LoginController");
const FazendaController = require("./controllers/FazendaController");
const AreaController = require("./controllers/AreaController");
const LocalizacaoFazendaController = require("./controllers/LocalizacaoFazendaController");
const LocalizacaoAreaController = require("./controllers/LocalizacaoAreaController");

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

module.exports = routes;
