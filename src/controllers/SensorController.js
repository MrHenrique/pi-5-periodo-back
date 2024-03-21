const Sensor = require("../models/Sensor");

module.exports = {
    //Mostrar todos os sensores
    async showAll(req, res) {
        // #swagger.tags = ['Sensor']
        // #swagger.summary = "Mostrar todos os sensores"
        try {
            const sensores = await Sensor.findAll();
            return res.status(200).json(sensores);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Mostrar sensores pelo id
    async show(req, res) {
        // #swagger.tags = ['Sensor']
        // #swagger.summary = "Mostrar sensores pelo id"
        try {
            const { idSensor } = req.params;
            const sensor = await Sensor.findByPk(idSensor);

            if (!sensor) {
                return res.status(404).json({ error: "Sensor não encontrada." });
            }

            return res.status(200).json(sensor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Criar um Sensor
    async create(req, res) {
        // #swagger.tags = ['Sensor']
        // #swagger.summary = "Criar um novo sensor"
        try {
            const { idSensor } = req.params;
            const { numSensor, idArea, idFazenda } = req.body;

            const sensor = await Sensor.findByPk(idSensor);

            if (!sensor) {
                return res
                    .status(404)
                    .json({ error: "Sensor não encontrada." });
            }

            const sensorExistente = await Sensor.findOne({
                where: {
                    numSensor,
                    idArea,
                    idFazenda,
                },
            });

            if (sensorExistente) {
                return res.status(400).json({
                    error: "Já existe um sensor com esses dados.",
                });
            }

            const TipoSensorExistente = await Sensor.findOne({
                where: { numSensor },
            });

            if (TipoSensorExistente) {
                return res.status(400).json({
                    error: "Já esiste um Sensor com esse tipo .",
                });
            }
            const AreaExistente = await Sensor.findOne({
                where: { idArea, idFazenda },
            });

            if (AreaExistente) {
                return res.status(400).json({
                    error: "Já esiste um Sensor com essa area .",
                });
            }

            const sensorA = await Sensor.create({
                numSensor,
                idArea,
                idFazenda,
            });

            return res.status(201).json(sensorA);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //alterar uma Sensor pelo id
    async update(req, res) {
        // #swagger.tags = ['Sensor']
        // #swagger.summary = "Alterar um sensor pelo id"
        try {
            const { idSensor } = req.params;
            const { numSensor, idArea, idFazenda } = req.body;

            const sensor = await Sensor.findByPk(idSensor);

            if (!sensor) {
                return res
                    .status(404)
                    .json({
                        error: "Sensor não encontrada, não houve mudança de valores.",
                    });
            }

            if (numSensor && numSensor !== sensor.numSensor) {
                sensor.numSensor = numSensor;
            }
            if (idArea && idArea !== sensor.idArea) {
                sensor.idArea = idArea;
            }
            if (idFazenda && idFazenda !== sensor.idFazenda) {
                sensor.idFazenda = idFazenda;
            }

            if (sensor.changed()) {
                await sensor.save();
            } else {
                return res.status(500).json({ message: "Sensor não alterada." });
            }

            return res.status(200).json({
                message: "Sensor alterado com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Excluir um sensor pelo id
    async delete(req, res) {
        // #swagger.tags = ["Sensor"]
        // #swagger.summary = "Excluir um sensor pelo id"
        try {
            const { idSensor } = req.params;

            const sensor = await Sensor.findByPk(idSensor);

            if (!sensor) {
                return res.status(404).json({ error: "Sensor não encontrada. " });
            }

            await sensor.destroy();

            return res.status(200).json({
                message: "Sensor excluído com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
