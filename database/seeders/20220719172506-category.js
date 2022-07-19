'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [ 
      {
        name: 'category name',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]
    return queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
