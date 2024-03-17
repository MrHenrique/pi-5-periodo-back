const Fazenda = require("../models/Fazenda");
const Login = require("../models/Login");
const LocalizacaoFazenda = require("../models/LocalizacaoFazenda");

module.exports = {
    //Mostrar todos as fazendas
    async showAll(req, res) {
        // #swagger.tags = ['Fazenda']
        // #swagger.summary = "Mostrar todas as fazendas"
        try {
            const fazendas = await Fazenda.findAll({
                include: { association: "Areas" },
            });
            return res.status(200).json(fazendas);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Mostrar uma fazenda pelo id
    async show(req, res) {
        // #swagger.tags = ['Fazenda']
        // #swagger.summary = "Mostrar uma fazenda pelo id"
        try {
            const { idFazenda } = req.params;
            const fazenda = await Fazenda.findByPk(idFazenda, {
                include: { association: "Areas" },
            });

            if (!fazenda) {
                return res
                    .status(404)
                    .json({ error: "Fazenda não encontrada." });
            }

            return res.status(200).json(fazenda);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Criar uma fazenda
    async create(req, res) {
        // #swagger.tags = ['Fazenda']
        // #swagger.summary = "Criar uma nova fazenda"
        try {
            const { idLogin } = req.params;
            const { nomeFazenda, idLocalizacaoFazenda } = req.body;

            const login = await Login.findByPk(idLogin);

            if (!login) {
                return res.status(404).json({ error: "Login não encontrado." });
            }

            const localizacaoFazendaExistente = await Fazenda.findOne({
                where: { idLocalizacaoFazenda },
            });

            if (localizacaoFazendaExistente) {
                return res.status(400).json({
                    error: "Já essiste uma fazenda cadastrada com essa localização.",
                });
            }

            let fazenda = await Fazenda.findOne({
                where: { nomeFazenda },
            });

            if (!fazenda) {
                fazenda = await Fazenda.create({
                    nomeFazenda,
                    idLocalizacaoFazenda,
                });
            } else {
                return res
                    .status(400)
                    .json({ error: "Já existe uma fazenda com esse nome." });
            }

            await login.addFazenda(fazenda);

            return res.status(201).json(fazenda);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Atualizar uma fazenda pelo id
    async update(req, res) {
        // #swagger.tags = ['Fazenda']
        // #swagger.summary = "Atualizar uma fazenda pelo id"
        try {
            const { idFazenda } = req.params;
            const { nomeFazenda, idLocalizacaoFazenda } = req.body;

            const fazenda = await Fazenda.findByPk(idFazenda);

            if (!fazenda) {
                return res
                    .status(404)
                    .json({ error: "Fazenda não encontrada." });
            }

            if (nomeFazenda && nomeFazenda !== fazenda.nomeFazenda) {
                fazenda.nomeFazenda = nomeFazenda;
            }
            if (
                idLocalizacaoFazenda &&
                idLocalizacaoFazenda !== fazenda.idLocalizacaoFazenda
            ) {
                fazenda.idLocalizacaoFazenda = idLocalizacaoFazenda;
            }

            if (fazenda.changed()) {
                await fazenda.save();
            } else {
                return res.status(500).json({
                    message:
                        "Fazenda não alterada, não houve mudança de valores.",
                });
            }
            return res.status(200).json({
                message: "Fazenda atualizada com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Excluir uma fazenda pelo id
    async delete(req, res) {
        // #swagger.tags = ["Fazenda"]
        // #swagger.summary = "Excluir uma fazenda pelo id"
        try {
            const { idFazenda } = req.params;

            const fazenda = await Fazenda.findByPk(idFazenda);

            if (!fazenda) {
                return res
                    .status(404)
                    .json({ error: "Fazenda não encontrada. " });
            }

            await fazenda.destroy();

            return res.status(200).json({
                message: "Fazenda excluída com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
