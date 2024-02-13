'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntranceExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EntranceExam.init({
    name: DataTypes.STRING,
    registrationStart: DataTypes.DATE,
    registrationEnd: DataTypes.DATE,
    exam1: DataTypes.STRING,
    exam2: DataTypes.STRING,
    exam3: DataTypes.STRING,
    resultDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    urlImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EntranceExam',
  });
  return EntranceExam;
};