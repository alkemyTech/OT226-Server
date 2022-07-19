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
      New.hasMany(models.Comment, { foreignKey: 'newsId' })
    }
  };
  New.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'New',
  });
  return New;
};