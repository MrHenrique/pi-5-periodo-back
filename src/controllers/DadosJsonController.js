const { Sequelize } = require("sequelize");
const DadosJson = require("../models/DadosJson");


module.exports = {
    //Mostrar todos os dados
    async showAll(req, res) {
        // #swagger.tags = ['DadosJson']
        // #swagger.summary = "Mostrar todos os dados"
        try {
            // const dadosJson = await DadosJson.aggregate('valorDados', 'average', {where: 
            // {}});
                const dadosJson =await DadosJson.findAll({
                where: Sequelize.where(Sequelize.fn('DATE', Sequelize.col('dateField')), new Date().toISOString().slice(0,10))
               });
            return res.status(200).json(dadosJson);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Criar um DadoJson
    async create(req, res) {
        // #swagger.tags = ['DadosJson']
        // #swagger.summary = "Criar um novo dadoJson"
        try {
            const { idSensor, valorDados } = req.body;

            const dadoscriados = await DadosJson.create({
                idSensor,
                valorDados,
            });

            return res.status(201).json(dadoscriados);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Excluir um dado pelo id
    async delete(req, res) {
        // #swagger.tags = ["DadosJson"]
        // #swagger.summary = "Excluir um dadoJson pelo id"
        try {
            const { idDadosJson } = req.params;

            const dados = await DadosJson.findByPk(idDadosJson);

            if (!dados) {
                return res.status(404).json({ error: "Dado não encontrado. " });
            }

            await dados.destroy();

            return res.status(200).json({
                message: "Dado excluído com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Excluir Tudo
    async deleteTudo(req, res) {
        // #swagger.tags = ["DadosJson"]
        // #swagger.summary = "Excluir todos dadosJson"
        try {

            await DadosJson.destroy();

            return res.status(200).json({
                message: "Tudo Excluido com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
