const sql = require("mssql");

const config = {
    user: 'pi-5-periodo-server-admin',
    password: 'PasswordDb0',
    server: 'pi-5-periodo-server.database.windows.net',
    database: 'pi-5-periodo-database',
    port: 1433,
    encrypt: true,
    trustServerCertificate: false,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
};

//Vendo se deu certo ou nao o banco
sql.connect(config, function(err){
    if(err) console.log("\n Erro ao conectar Banco de dados! \n\n" + err);

    // Chamar as funções para inserir dados
    inserirDadosLogin("testenode3", "testesenhanode3");
    inserirDadosPessoa("John Doe", "Proprietario");

    // Função para inserir dados na tabela pai
    async function inserirDadosLogin(email, Senha_Hash) {
        try {
            await sql.connect(config);
            const result = await sql.query `insert into Login (Email, Senha_Hash) values (${email}, ${Senha_Hash})`;
            console.log('Dados inseridos na tabela pai com sucesso');
        } catch (error) {
            console.error('Erro ao inserir dados na tabela pai:', error);
        }
    }

    // Função para inserir dados na tabela filho
    async function inserirDadosPessoa(nome, proprietariofazenda) {
        try {
            await sql.connect(config);

            await sql.query("set identity_insert Pessoa on");
            // Inserir dados na tabela filho com referência à tabela pai (exemplo)
            const result = await sql.query`insert into Pessoa (Nome, ProprietarioFazenda) values (${nome}, ${proprietariofazenda})`;

            console.log('Dados inseridos na tabela filho com sucesso');

            
        } catch (error) {
            console.error('Erro ao inserir dados na tabela filho:', error);
        }
    }
});
