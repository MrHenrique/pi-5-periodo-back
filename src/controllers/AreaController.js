const Fazenda = require("../models/Fazenda");
const Area = require("../models/Area");
const LocalizacaoArea = require("../models/LocalizacaoArea");

module.exports = {
    //Mostrar todos as areas
    async showAll(req, res) {
        // #swagger.tags = ['Area']
        // #swagger.summary = "Mostrar todas as "
        try {
            const areas = await Area.findAll();
            return res.status(200).json(areas);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Mostrar uma área pelo id
    async show(req, res) {
        // #swagger.tags = ['Area']
        // #swagger.summary = "Mostrar uma área pelo id"
        try {
            const { idArea } = req.params;
            const area = await Area.findByPk(idArea);

            if (!area) {
                return res.status(404).json({ error: "Área não encontrada." });
            }

            return res.status(200).json(area);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Criar uma área
    async create(req, res) {
        // #swagger.tags = ['Area']
        // #swagger.summary = "Criar uma nova área"
        try {
            const { idFazenda } = req.params;
            const { nomeArea, tamanho, latitude, longitude } = req.body;

            const fazenda = await Fazenda.findByPk(idFazenda);

            if (!fazenda) {
                return res
                    .status(404)
                    .json({ error: "Fazenda não encontrada." });
            }

            const areaExistente = await Area.findOne({
                where: { nomeArea },
            });

            const localizacaoAreaExistente = await LocalizacaoArea.findOne({
                where: { latitude, longitude },
            });

            if (localizacaoAreaExistente) {
                const areaAssociada = await Area.findOne({
                    where: {
                        idLocalizacaoArea:
                            localizacaoAreaExistente.idLocalizacaoArea,
                    },
                });
                if (areaAssociada) {
                    return res.status(400).json({
                        error: "Já existe uma área cadastrada com essa localização.",
                    });
                } else {
                    if (areaExistente) {
                        return res.status(400).json({
                            error: "Já essiste uma área cadastrada com esse nome nesta fazenda.",
                        });
                    }

                    const area = await Area.create({
                        nomeArea,
                        tamanho,
                        idFazenda,
                        idLocalizacaoArea:
                            localizacaoAreaExistente.idLocalizacaoArea,
                    });

                    return res.status(201).json(area);
                }
            }

            if (areaExistente) {
                return res.status(400).json({
                    error: "Já existe uma área com esse nome nesta fazenda.",
                });
            }

            if (!areaExistente && !localizacaoAreaExistente) {
                const localizacaoArea = await LocalizacaoArea.create({
                    latitude,
                    longitude,
                });

                const area = await Area.create({
                    nomeArea,
                    tamanho,
                    idFazenda,
                    idLocalizacaoArea: localizacaoArea.idLocalizacaoArea,
                });

                return res.status(201).json(area);
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //alterar uma área pelo id
    async update(req, res) {
        // #swagger.tags = ['Area']
        // #swagger.summary = "Alterar uma área pelo id"
        try {
            const { idArea } = req.params;
            const { nomeArea, tamanho, idLocalizacaoArea } = req.body;

            const area = await Area.findByPk(idArea);

            if (!area) {
                return res.status(404).json({
                    error: "Área não encontrada, não houve mudança de valores.",
                });
            }

            if (nomeArea && nomeArea !== area.nomeArea) {
                area.nomeArea = nomeArea;
            }
            if (tamanho && tamanho !== area.tamanho) {
                area.tamanho = tamanho;
            }
            if (
                idLocalizacaoArea &&
                idLocalizacaoArea !== area.idLocalizacaoArea
            ) {
                area.idLocalizacaoArea = idLocalizacaoArea;
            }

            if (area.changed()) {
                await area.save();
            } else {
                return res.status(500).json({ message: "Área não alterada." });
            }

            return res.status(200).json({
                message: "Área alterada com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Excluir uma área pelo id
    async delete(req, res) {
        // #swagger.tags = ["Area"]
        // #swagger.summary = "Excluir uma área pelo id"
        try {
            const { idArea } = req.params;

            const area = await Area.findByPk(idArea);

            if (!area) {
                return res.status(404).json({ error: "Área não encontrada. " });
            }

            await area.destroy();

            return res.status(200).json({
                message: "Área excluída com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
