const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Some description..."
    },
    servers: [
        {
            url: 'pi-5-periodo.azurewebsites.net'
        }
    ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js');           // Your project's root file
});