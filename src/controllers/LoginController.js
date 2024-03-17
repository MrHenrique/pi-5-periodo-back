const Login = require("../models/Login");

module.exports = {
    //Mostrar todos os logins
    async showAll(req, res) {
        // #swagger.tags = ['Login']
        // #swagger.summary = "Mostrar todos os logins"
        try {
            const logins = await Login.findAll();
            return res.status(200).json(logins);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async show(req, res) {
        // #swagger.tags = ['Login']
        // #swagger.summary = "Mostrar login pelo id"
        try {
            const { idLogin } = req.params;
            const login = await Login.findByPk(idLogin, {
                include: [
                    {
                        association: "Fazendas",
                        include: ["LocalizacaoFazenda", "Areas"],
                        through: { attributes: [] },
                    },
                ],
            });

            if (!login) {
                return res.status(404).json({ error: "Login não encontrado." });
            }

            return res.status(200).json(login);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Criar um login
    async create(req, res) {
        // #swagger.tags = ['Login']
        // #swagger.summary = "Criar um novo login"
        try {
            const { nome, email, senha } = req.body;
            const login = await Login.create({ nome, email, senha });

            return res.status(201).json(login);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //alterar um login
    async update(req, res) {
        // #swagger.tags = ['Login']
        // #swagger.summary = "Alterar um login pelo id"
        try {
            const { idLogin } = req.params;
            const { nome, email, senha } = req.body;

            const login = await Login.findByPk(idLogin);

            if (!login) {
                return res.status(404).json({ error: "Login não encontrado." });
            }

            if (nome && nome !== login.nome) {
                login.nome = nome;
            }
            if (email && email !== login.email) {
                login.email = email;
            }
            if (senha && senha !== login.senha) {
                login.senha = senha;
            }

            if (login.changed()) {
                await login.save();
            } else {
                return res.status(500).json({
                    message:
                        "Login não alterado, não houve mudança de valores.",
                });
            }

            return res
                .status(200)
                .json({ message: "Login alterado com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Deletar um login
    async delete(req, res) {
        // #swagger.tags = ["Login"]
        // #swagger.summary = "Deletar um login"
        try {
            const { idLogin } = req.params;
            const login = await Login.findByPk(idLogin);

            if (!login) {
                return res.status(404).json({ error: "Login não encontrado." });
            }

            await login.destroy();

            return res
                .status(200)
                .json({ message: "Login deletado com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};
