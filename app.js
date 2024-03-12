const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
require("dotenv").config();
const db = require("./db");
const express = require('express'); 
const app = express();
const port = process.env.PORT || 3000
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get('/', (req, res) => res.json({ message: 'Conexão Realizada' }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));


//GET
//login
app.get('/banco', async (req, res) => { 
    const customers = await db.selectCustomers();
    res.json(customers);
})
app.get('/banco/:usuario', async (req, res) => { 
    const customer = await db.selectCustomer(req.params.usuario);
    res.json(customer);
})

// //pessoa
// app.get('/banco/pessoa', async (req, res) => { 
//     const customers = await db.procurarPessoas();
//     res.json(customers);
// })
// app.get('/banco/pessoa/:idpessoa', async (req, res) => { 
//     const customers = await db.procurarPessoa(req.params.idpessoa);
//     res.json(customers);
// })


//PATCH
//login
app.patch('/banco', async (req, res) => {
    console.log(req.body)
    await db.inserirbanco(req.body);
    res.sendStatus(201);
});
app.patch('/banco/:usuario', async (req, res) => {
    console.log(req.body);
    await db.atualizarbanco(req.params.usuario, req.body);
    res.sendStatus(200);
})

//pessoa
// app.patch('/banco/pessoa/:usuario', async (req, res) => {
//     console.log(req.body);
//     await db.inserirbancoPessoa(req.params.usuario, req.body);
//     res.sendStatus(201);
// })
// app.patch('/banco/pessoa/atualizar/:usuario', async (req, res) => {
//     console.log(req.body);
//     await db.inserirbancoPessoa(req.params.usuario, req.body);
//     res.sendStatus(201);
// })

//localizacaofazenda
app.patch('/banco/localizacaofazenda/:idlocalizacaofazenda', async (req, res) => {
    console.log(req.body);
    await db.inserirbancoLocalizacaoFazenda(req.body);
    res.sendStatus(201);
})
app.patch('/banco/localizacaofazenda/atualizar/:idlocalizacaofazenda', async (req, res) => {
    console.log(req.body);
    await db.atualizarbancolocalizacaofazenda(req.params.idlocalizacaofazenda, req.body);
    res.sendStatus(200);
})

//fazenda
app.patch('/banco/fazenda/:idlocalizacaofazenda', async (req, res) => {
    console.log(req.body);
    await db.inserirbancoFazenda(req.params.idlocalizacaofazenda, req.body);
    res.sendStatus(201);
})
app.patch('/banco/fazenda/atualizar/:idfazenda', async (req, res) => {
    console.log(req.body);
    await db.atualizarbancolocalizacaofazenda(req.params.idfazenda, req.body);
    res.sendStatus(200);
})





//DEL
app.delete('/banco/:usuario', async (req, res) =>{
    await db.excluirbanco(req.params.usuario);
    res.sendStatus(204);
})



// PORTA DE ENTRADA BANCO
app.listen(port);