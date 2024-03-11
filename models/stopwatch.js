'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stopwatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define a associação com o modelo Subject
      this.belongsTo(models.Subject, { foreignKey: 'subjectId' }); // Adicionando a associação com a tabela Subjects
    }
  }
  Stopwatch.init({
    description: DataTypes.STRING,
    time: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    subjectId: DataTypes.INTEGER // Adicionando a nova coluna subjectId
  }, {
    sequelize,
    modelName: 'Stopwatch',
  });
  return Stopwatch;
};
