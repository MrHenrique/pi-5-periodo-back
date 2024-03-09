const sql = require("mssql/msnodesqlv8");
const { config } = require("../router");


// METODO GET
async function buscarLogins(req, res) {
    try {
        await sql.connect(config);
        const result = await sql.query`select * from Login`;
        return res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Erro ao recuperar dados da tabela Login:', error);
        return res.status(200).json({ error: 'Erro ao recuperar dados da tabela Login' });
    } finally {
    }
}


module.exports = {
    buscarLogins
}