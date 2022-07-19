'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const news = [ 
      {
        name: 'new name',
        content: 'content',
        image: 'img.png',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'new name',
        content: 'content',
        image: 'img.png',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'new name',
        content: 'content',
        image: 'img.png',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'new name',
        content: 'content',
        image: 'img.png',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'new name',
        content: 'content',
        image: 'img.png',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]
    return queryInterface.bulkInsert('News', news, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('News', null, {});
  }
};
