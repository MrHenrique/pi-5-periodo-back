const LocalizacaoArea = require("../models/LocalizacaoArea");

module.exports = {
    //Mostrar todas as localizações
    async showAll(req, res) {
        // #swagger.tags = ['LocalizacaoArea']
        // #swagger.summary = "Mostrar todas as localizacões da área"
        try {
            const localizacoes = await LocalizacaoArea.findAll();
            return res.status(200).json(localizacoes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Mostrar uma localizacao da área pelo id
    async show(req, res) {
        // #swagger.tags = ['LocalizacaoArea']
        // #swagger.summary = "Mostrar uma localizacao da área pelo id"
        try {
            const { idLocalizacaoArea } = req.params;
            const localizacaoArea = await LocalizacaoArea.findByPk(
                idLocalizacaoArea,
            );

            if (!localizacaoArea) {
                return res
                    .status(404)
                    .json({ error: "Localização da área não encontrada." });
            }

            return res.status(200).json(localizacaoArea);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Criar uma LocalizacaoArea
    async create(req, res) {
        // #swagger.tags = ['LocalizacaoArea']
        // #swagger.summary = "Criar uma nova localizacao da área"
        try {
            const { latitude, longitude } = req.body;

            const localizacaoExistente = await LocalizacaoArea.findOne({
                where: { latitude, longitude },
            });

            if (localizacaoExistente) {
                return res.status(400).json({
                    error: "Já existe uma localização com essas coordenadas.",
                });
            }

            const localizacaoArea = await LocalizacaoArea.create({
                latitude,
                longitude,
            });
            return res.status(201).json(localizacaoArea);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //alterar uma localizacao da área pelo id
    async update(req, res) {
        // #swagger.tags = ['LocalizacaoArea']
        // #swagger.summary = "Alterar uma localizacao da área pelo id"
        try {
            const { idLocalizacaoArea } = req.params;
            const { latitude, longitude } = req.body;

            const localizacaoArea = await LocalizacaoArea.findByPk(
                idLocalizacaoArea,
            );

            if (!localizacaoArea) {
                return res
                    .status(404)
                    .json({ error: "Localização da área não encontrada." });
            }

            if (latitude && latitude !== localizacaoArea.latitude) {
                localizacaoArea.latitude = latitude;
            }
            if (longitude && longitude !== localizacaoArea.longitude) {
                localizacaoArea.longitude = longitude;
            }

            if (localizacaoArea.changed()) {
                await localizacaoArea.save();
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                            "Localização da área não alterada, não houve mudança de valores.",
                    });
            }

            return res.status(200).json({
                message: "Localizacao da área alterada com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Excluir uma Localização da área pelo id
    async delete(req, res) {
        // #swagger.tags = ["LocalizacaoArea"]
        // #swagger.summary = "Excluir uma localização área pelo id"
        try {
            const { idLocalizacaoArea } = req.params;

            const localizacaoArea = await LocalizacaoArea.findByPk(
                idLocalizacaoArea,
            );

            if (!localizacaoArea) {
                return res
                    .status(404)
                    .json({ error: "Localização da área não encontrada. " });
            }

            await localizacaoArea.destroy();

            return res.status(200).json({
                message: "Localização da área excluída com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
