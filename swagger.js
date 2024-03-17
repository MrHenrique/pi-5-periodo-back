const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Some description...",
    },
    servers: [
        {
            url: "",
        },
    ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/router.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("./src/server"); // Your project's root file
});
