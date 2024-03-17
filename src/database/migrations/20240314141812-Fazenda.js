"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Fazenda", {
            idFazenda: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nomeFazenda: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            idLocalizacaoFazenda: {
                type: Sequelize.SMALLINT,
                allowNull: true,
                references: {
                    model: "LocalizacaoFazenda",
                    key: "idLocalizacaoFazenda",
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
        await queryInterface.dropTable("Fazenda");
    },
};
