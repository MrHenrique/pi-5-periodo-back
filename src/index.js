const express = require("mssql/msnodesqlv8");

const config ={
    server :"DESKTOP-MHN2CVV\\SQLEXPRESS", 
        database : "IrrigaFacil",
        driver: "msnodesqlv8",
        options:{
            trustedConnection:true
        }
}

//Vendo se deu certo ou nao o banco
sql.connect(config, function(err){
    if(err)console.log("\n Erro ao conectar Banco de dados! \n\n" + err);

    // Chamar as funções para inserir dados
    inserirDadosPai();
    inserirDadosFilho();

// //Se deu certo começa a executar os comandos iniciais
//     var request = new sql.Request();

// //Cadastra na Tabela Login
//     request.query("insert into Login (Email, Senha_Hash) values ('testenode3', 'testesenhanode3')", 
// function(err, result){
//     if(!err){
//         console.log("Login cadastrado com sucesso!");
//     } else{
//         console.log("Erro ao cadastar Login!");
//     }

// //Pesquisa a Tabela Login para ver o que está dentro
// });
//     request.query("select * from Login",  function(err, records){
//         if(err)console.log("Erro ao Pesquisar Login" + err);
//         else console.log(records);
//     });

// //Apaga os dados que adicionou
//     request.query("delete from Login", function(err, result){
//         if(!err){
//             console.log("Tudo Certo!");
//         }else{
//             console.log("Algo Errado!");
//         }
//     })



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

        await sql.query("set identity_inserti Pessoa on");
        // Inserir dados na tabela filho com referência à tabela pai (exemplo)
        const result = await sql.query`insert into Pessoa (IDPessoa, Nome, ProprietarioFazenda) values (ident_current('Login'), ${nome}, ${proprietariofazenda})`;

        console.log('Dados inseridos na tabela filho com sucesso');

        await sql.query `set identity_insert Pessoa off`
    } catch (error) {
        console.error('Erro ao inserir dados na tabela filho:', error);
    }
}
})
