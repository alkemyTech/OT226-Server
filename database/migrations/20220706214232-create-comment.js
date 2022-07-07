'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade',
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false
      },
      news_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'News',
          key: 'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};