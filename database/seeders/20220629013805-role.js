'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = [
      {
        id: 1,
        name: "user", 
        description: "user", 
      },
      {
        id: 2,
        name: "admin", 
        description: "user admin", 
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
