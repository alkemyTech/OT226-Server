'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
   
    static associate(models) {
      
      New.belongsTo( models.Category, {
        foreignKey: 'categoryId'
      });

      New.hasMany( models.Comment, {
        foreignKey: 'newId',
      });
      
    }
  };
  New.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'New',
  });
  return New;
};