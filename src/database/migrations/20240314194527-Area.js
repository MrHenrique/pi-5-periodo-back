"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Area", {
            idArea: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nomeArea: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tamanho: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            idLocalizacaoArea: {
                type: Sequelize.SMALLINT,
                allowNull: true,
                references: {
                    model: "LocalizacaoArea",
                    key: "idLocalizacaoArea",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            idFazenda: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Fazenda",
                    key: "idFazenda",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Area");
    },
};
