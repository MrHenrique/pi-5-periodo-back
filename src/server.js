const express = require("express");
const routes = require("./router");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

const port = 3000;

require("./database");

const app = express();

app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(port, () => console.log("Servidor rodando na porta: " + port));
