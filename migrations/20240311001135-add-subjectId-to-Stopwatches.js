'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Stopwatches', 'subjectId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Defina como true ou false dependendo da sua lógica de negócios
      references: {
        model: 'Subjects', // Substitua 'Subjects' pelo nome real da tabela
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Stopwatches', 'subjectId');
  }
};
