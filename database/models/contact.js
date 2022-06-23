'use strict';
const { DATE } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {

    static associate(models) {
    }
  }
  Contact.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName: 'Contact',
  });
  return Contact;
}