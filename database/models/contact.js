'use strict';
const { DATE } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {

    static associate(models) {
      Contact.belongsTo( models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Contact.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    messege: DataTypes.STRING,
    userId: DataTypes.INTEGER, // control de que usuario creo el contacto
  }, {
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName: 'Contact',
  });
  return Contact;
}