"use strict";

const { sequelize } = require('../../models/Sensor');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("DadosJson", {
            idDadosJson: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: false,
                allowNull: false,
            },
            idSensor: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              references: {
                model: "Sensor",
                key: "idSensor",
              },
              onUpdate: "CASCADE",
              onDelete: "CASCADE",
            },
            valorDados: {
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
        await queryInterface.dropTable("DadosJson");
    },
};