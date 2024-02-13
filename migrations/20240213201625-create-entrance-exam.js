'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EntranceExams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      registrationStart: {
        type: Sequelize.DATE
      },
      registrationEnd: {
        type: Sequelize.DATE
      },
      exam1: {
        type: Sequelize.STRING
      },
      exam2: {
        type: Sequelize.STRING
      },
      exam3: {
        type: Sequelize.STRING
      },
      resultDate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      urlImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EntranceExams');
  }
};