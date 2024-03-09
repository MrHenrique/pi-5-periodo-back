async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();
    global.connection = pool;
    return pool.connect();
}

connect();


//PESQUISAR LOGIN
async function selectCustomers() {
    const client = await connect();
    const res = await client.query('select * from Login');
    return res.rows;
}
async function selectCustomer(usuario) {
    const client = await connect();
    const res = await client.query('SELECT * FROM login WHERE usuario=$1', [usuario]);
    await client.query('')
    return res.rows;
}

// //PESQUISAR PESSOA
// async function procurarPessoas() {
//     const client = await connect();
//     const res = await client.query('select * from pessoa');
//     return res.rows;
// }
// async function procurarPessoa(idpessoa) {
//     const client = await connect();
//     const res = await client.query('SELECT * FROM pessoa WHERE idpessoa=$1', [idpessoa]);
//     await client.query('')
//     return res.rows;
// }



//EXCLUIR
async function excluirbanco(usuario) {
    const client = await connect();
    return await client.query('DELETE FROM login where usuario=$1;', [usuario]);
}


//ADICIONAR LOGIN
async function inserirbanco(customer) {
    const client = await connect();
    const sql = 'INSERT INTO login (email,senha_hash) VALUES ($1,$2);';
    const values = [customer.email, customer.senha_hash];
    return await client.query(sql, values);
}
//ATUALIZAR LOGIN
async function atualizarbanco(usuario, customer) {
    const client = await connect();
    const sql = 'UPDATE login SET email = $1, senha_hash = $2 WHERE usuario = $3';
    const values = [customer.email, customer.senha_hash, usuario];
    return await client.query(sql, values);
}


//ADICIONAR PESSOA
async function inserirbancoPessoa(usuario, customer) {
    const client = await connect();
    const sql = 'INSERT INTO pessoa (idpessoa, nome, proprietariofazenda) VALUES ($3,$1,$2)';
    const values = [customer.nome, customer.proprietariofazenda, usuario];
    return await client.query(sql, values);
}
//ATUALIZAR PESSOA
async function atualizarbancoPessoa(usuario, customer) {
    const client = await connect();
    const sql = 'UPDATE pessoa SET nome = $1, proprietariofazenda = $2 WHERE usuario = $3';
    const values = [customer.nome, customer.proprietariofazenda, usuario];
    return await client.query(sql, values);
}


//ADICIONAR LOCALIZAÇAOFAZENDA
async function inserirbancoLocalizacaoFazenda(customer) {
    const client = await connect();
    const sql = 'INSERT INTO localizacaoFazenda (longitude, latitude) VALUES ($1,$2)';
    const values = [customer.nome, customer.proprietariofazenda, idlocalizacaofazenda];
    return await client.query(sql, values);
}
//ATUALIZAR LOCALIZACAOFAZENDA
async function atualizarbancolocalizacaofazenda(idlocalizacaofazenda, customer) {
    const client = await connect();
    const sql = 'UPDATE localizacaofazenda SET longitude = $1, latitude = $2 WHERE idlocalizacaofazenda = $3';
    const values = [customer.longitude, customer.latitude, idlocalizacaofazenda];
    return await client.query(sql, values);
}

//ADICIONAR FAZENDA
async function inserirbancoFazenda(idlocalizacaofazenda, customer) {
    const client = await connect();
    const sql = 'INSERT INTO fazenda (nomefazenda, idlocalizacaofazenda) VALUES ($1,$2)';
    const values = [customer.nomefazenda, idlocalizacaofazenda];
    return await client.query(sql, values);
}
//ATUALIZAR FAZENDA
async function inserirbancoFazenda(idfazenda, customer) {
    const client = await connect();
    const sql = 'UPDATE fazenda SET nomefazenda = $1 WHERE idfazenda = $3';
    const values = [customer.nomefazenda, idfazenda];
    return await client.query(sql, values);
}


module.exports = {
    selectCustomers,
    selectCustomer,
    excluirbanco,
    inserirbanco,
    atualizarbanco,
    inserirbancoPessoa,
    atualizarbancoPessoa,
    // procurarPessoa,
    // procurarPessoas,
    inserirbancoLocalizacaoFazenda,
    atualizarbancolocalizacaofazenda,
    inserirbancoFazenda
}