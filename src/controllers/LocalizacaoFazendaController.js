const LocalizacaoFazenda = require("../models/LocalizacaoFazenda");

module.exports = {
    //Mostrar todos as localizações
    async showAll(req, res) {
        // #swagger.tags = ['LocalizacaoFazenda']
        // #swagger.summary = "Mostrar todas as localizacões da fazenda"
        try {
            const localizacoes = await LocalizacaoFazenda.findAll();
            return res.status(200).json(localizacoes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Mostrar uma localizacao da fazenda pelo id
    async show(req, res) {
        // #swagger.tags = ['LocalizacaoFazenda']
        // #swagger.summary = "Mostrar uma localizacao da fazenda pelo id"
        try {
            const { idLocalizacaoFazenda } = req.params;
            const localizacaoFazenda = await LocalizacaoFazenda.findByPk(
                idLocalizacaoFazenda,
            );

            if (!localizacaoFazenda) {
                return res
                    .status(404)
                    .json({ error: "Localização da fazenda não encontrada." });
            }

            return res.status(200).json(localizacaoFazenda);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Criar uma LocalizacaoFazenda
    async create(req, res) {
        // #swagger.tags = ['LocalizacaoFazenda']
        // #swagger.summary = "Criar uma nova localizacao da fazenda"
        try {
            const { latitude, longitude } = req.body;

            const localizacaoExistente = await LocalizacaoFazenda.findOne({
                where: { latitude, longitude },
            });

            if (localizacaoExistente) {
                return res.status(400).json({
                    error: "Já existe uma localização com essas coordenadas.",
                });
            }

            const localizacaoFazenda = await LocalizacaoFazenda.create({
                latitude,
                longitude,
            });
            return res.status(201).json(localizacaoFazenda);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //alterar uma localizacao da fazenda pelo id
    async update(req, res) {
        // #swagger.tags = ['LocalizacaoFazenda']
        // #swagger.summary = "Alterar uma localizacao da fazenda pelo id"
        try {
            const { idLocalizacaoFazenda } = req.params;
            const { latitude, longitude } = req.body;

            const localizacaoFazenda = await LocalizacaoFazenda.findByPk(
                idLocalizacaoFazenda,
            );

            if (!localizacaoFazenda) {
                return res
                    .status(404)
                    .json({ error: "Localização da fazenda não encontrada." });
            }

            if (latitude && latitude !== localizacaoFazenda.latitude) {
                localizacaoFazenda.latitude = latitude;
            }
            if (longitude && longitude !== localizacaoFazenda.longitude) {
                localizacaoFazenda.longitude = longitude;
            }

            if (localizacaoFazenda.changed()) {
                await localizacaoFazenda.save();
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                            "Localização da fazenda não alterada, não houve mudança de valores.",
                    });
            }

            return res.status(200).json({
                message: "Localizacao da fazenda alterada com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Excluir uma Localização da fazenda pelo id
    async delete(req, res) {
        // #swagger.tags = ["LocalizacaoFazenda"]
        // #swagger.summary = "Excluir uma localização fazenda pelo id"
        try {
            const { idLocalizacaoFazenda } = req.params;

            const localizacaoFazenda = await LocalizacaoFazenda.findByPk(
                idLocalizacaoFazenda,
            );

            if (!localizacaoFazenda) {
                return res
                    .status(404)
                    .json({ error: "Localização da fazenda não encontrada. " });
            }

            await localizacaoFazenda.destroy();

            return res.status(200).json({
                message: "Localização da fazenda excluída com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
