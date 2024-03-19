const TipoSensor = require("../models/TipoSensor");

module.exports = {
    //Mostrar todos as Tipos sensores
    async showAll(req, res) {
        // #swagger.tags = ['TipoSensor']
        // #swagger.summary = "Mostrar todas os Tipos de Sensores"
        try {
            const Sensor = await TipoSensor.findAll();
            return res.status(200).json(Sensor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Mostrar um Sensor pelo seu numero
    async show(req, res) {
        // #swagger.tags = ['TipoSensor']
        // #swagger.summary = "Mostrar um Tipo Sensor pelo seu numero"
        try {
            const { numSensor } = req.params;
            const numeroSensor = await TipoSensor.findByPk(
                numSensor,
            );

            if (!numeroSensor) {
                return res
                    .status(404)
                    .json({ error: "Numero de Sensor não encontrado." });
            }

            return res.status(200).json(numeroSensor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Criar uma Sensor
    async create(req, res) {
        // #swagger.tags = ['TipoSensor']
        // #swagger.summary = "Criar um novo Tipo Sensor"
        try {
            const { nomeTipoSensor, obs } = req.body;

            const tipoSensorExistente = await TipoSensor.findOne({
                where: { nomeTipoSensor, obs },
            });

            if (tipoSensorExistente) {
                return res.status(400).json({
                    error: "Já existe um Sensor desse tipo.",
                });
            }

            const TipoSensor = await TipoSensor.create({
                nomeTipoSensor,
                obs,
            });
            return res.status(201).json(TipoSensor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //alterar um Tipo Sensor pelo Numero
    async update(req, res) {
        // #swagger.tags = ['TipoSensor']
        // #swagger.summary = "Alterar um TipoSensor pelo Numero"
        try {
            const { numSensor } = req.params;
            const { nomeTipoSensor, obs } = req.body;

            const Sensor = await TipoSensor.findByPk(
                numSensor,
            );

            if (!Sensor) {
                return res
                    .status(404)
                    .json({ error: "Numero Sensor não encontrada." });
            }

            if (nomeTipoSensor && nomeTipoSensor !== Sensor.nomeTipoSensor) {
                Sensor.nomeTipoSensor = nomeTipoSensor;
            }
            if (obs && obs !== Sensor.obs) {
                Sensor.obs = obs;
            }

            if (Sensor.changed()) {
                await Sensor.save();
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                            "TipoSensor não alterado, não houve mudança de valores.",
                    });
            }

            return res.status(200).json({
                message: "TipoSensor alterado com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Excluir um TipoSensor pelo numero
    async delete(req, res) {
        // #swagger.tags = ["TipoSensor"]
        // #swagger.summary = "Excluir um TipoSensor pelo Numero"
        try {
            const { numSensor } = req.params;

            const TipoSensor = await TipoSensor.findByPk(
                numSensor,
            );

            if (!TipoSensor) {
                return res
                    .status(404)
                    .json({ error: "TipoSensor não encontrado. " });
            }

            await TipoSensor.destroy();

            return res.status(200).json({
                message: "TipoSensor excluído com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
