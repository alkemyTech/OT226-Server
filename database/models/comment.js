'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'user_id' })
      Comment.belongsTo(models.News,{ foreignKey: 'news_id'})
    }
  };
  Comment.init({
    user_id: DataTypes.INTEGER,
    body: DataTypes.STRING,
    news_id: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Comment',
  });
  return Comment;
};