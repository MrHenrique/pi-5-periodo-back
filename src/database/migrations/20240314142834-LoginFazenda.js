"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("LoginFazenda", {
            idLogin: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Login",
                    key: "idLogin",
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
        await queryInterface.dropTable("LoginFazenda");
    },
};
