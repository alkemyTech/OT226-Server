'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Members.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    facebookUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagramUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Members',
    paranoid: true
  });
  return Members;
};