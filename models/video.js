'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      // Defina as associações aqui, se houver
    }
  }
  Video.init({
    title: DataTypes.STRING,
    videoLink: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    matter: DataTypes.STRING // Se você quiser associar vídeos a matérias
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};
