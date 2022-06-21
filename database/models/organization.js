'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Organization.init({
    name:{
      type: DataType.STRING,
      allowNull: false,
    },
    image: {
      type: DataType.STRING,
      allowNull: false,
    },
    address: {
      type: DataType.STRING,
      allowNull: true,
    },
    phone: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    welcomeText: {
      type: DataType.TEXT,
      allowNull: false,
    },
    aboutText: {
      type: DataType.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Organization',
  });
  return Organization;
};