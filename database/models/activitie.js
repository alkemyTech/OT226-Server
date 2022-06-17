'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activitie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Activitie.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName: 'Activitie',
  });
  return Activitie;
};