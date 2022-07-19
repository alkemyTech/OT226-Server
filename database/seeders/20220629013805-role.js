'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = [
      {
        id: 1,
        name: "user",
        description: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        name: "admin",
        description: "user admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,

      }
    ]
    await queryInterface.bulkInsert('Roles', roles, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
