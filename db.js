const sql = require('mssql');

async function connect() {
    if (global.connection)
        return global.connection;

    try {
        await sql.connect(process.env.CONNECTION_STRING);
        console.log("Connected to SQL Server!");
        global.connection = sql;
        return global.connection;
    } catch (error) {
        console.error("Error connecting to SQL Server:", error.message);
        throw error;
    }
}

// PESQUISAR LOGIN
async function selectCustomers() {
    try {
        const pool = await connect();
        const result = await pool.query`select * from Login`;
        return result.recordset;
    } catch (error) {
        console.error("Error selecting customers:", error.message);
        throw error;
    }
}

async function selectCustomer(usuario) {
    try {
        const pool = await connect();
        const result = await pool.query`SELECT * FROM login WHERE usuario = ${usuario}`;
        return result.recordset;
    } catch (error) {
        console.error("Error selecting customer:", error.message);
        throw error;
    }
}

// EXCLUIR
async function excluirbanco(usuario) {
    try {
        const pool = await connect();
        return await pool.query`DELETE FROM login where usuario = ${usuario}`;
    } catch (error) {
        console.error("Error deleting customer:", error.message);
        throw error;
    }
}

// ADICIONAR LOGIN
async function inserirbanco(customer) {
    try {
        const pool = await connect();
        const result = await pool.query`INSERT INTO login (email, senha_hash) VALUES (${customer.email}, ${customer.senha_hash})`;
        return result;
    } catch (error) {
        console.error("Error inserting customer:", error.message);
        throw error;
    }
}

// ATUALIZAR LOGIN
async function atualizarbanco(usuario, customer) {
    try {
        const pool = await connect();
        const result = await pool.query`UPDATE login SET email = ${customer.email}, senha_hash = ${customer.senha_hash} WHERE usuario = ${usuario}`;
        return result;
    } catch (error) {
        console.error("Error updating customer:", error.message);
        throw error;
    }
}


module.exports = {
    selectCustomers,
    selectCustomer,
    excluirbanco,
    inserirbanco,
    atualizarbanco
};
