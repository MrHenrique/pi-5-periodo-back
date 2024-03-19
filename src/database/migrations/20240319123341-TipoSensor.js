"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("TipoSensor", {
            numSensor: {
                type: Sequelize.CHAR(3),
                primaryKey: true,
                allowNull: false,
                autoIncrement: false,
            },
            nomeTipoSensor:{
              type: Sequelize.STRING,
              allowNull: false,
            },
            obs:{
              type: Sequelize.STRING,
              allowNull: false,
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
        await queryInterface.dropTable("TipoSensor");
    },
};
