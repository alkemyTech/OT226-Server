'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = [ 
      {
        body: 'body comment',
        userId: 1,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        body: 'body comment',
        userId: 1,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        body: 'body comment',
        userId: 1,
        newsId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]
    return queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
