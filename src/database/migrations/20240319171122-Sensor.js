"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Sensor", {
            idSensor: {
                type: Sequelize.SMALLINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            numSensor: {
              type: Sequelize.CHAR(3),
              allowNull: false,
              references: {
                model: "TipoSensor",
                key: "numSensor",
              },
            },
            idArea: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "Area",
                key: "idArea",
              },
              onUpdate: "CASCADE",
              onDelete: "CASCADE",
            },
            idFazenda: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "Area",
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
        await queryInterface.dropTable("Sensor");
    },
};