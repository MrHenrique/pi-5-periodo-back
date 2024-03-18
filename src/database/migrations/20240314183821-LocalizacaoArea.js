"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("LocalizacaoArea", {
            idLocalizacaoArea: {
                type: Sequelize.SMALLINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            longitude: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            latitude: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable("LocalizacaoArea");
    },
};
