'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      New.hasMany(models.Category, {
        foreignKey: categoryId
      })
    }
  };
  New.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryId: {
      type: DataTypes.NUMBER,
    }
  }, {
    sequelize,
    modelName: 'News',
    paranoid: true,
    timestamps: true
  });
  return News;
};