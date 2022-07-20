'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const organizations = [
      {
        name: 'org1',
        image: 'org1',
        address: 'calle falsa 123',
        phone: 12345,
        email: 'email@email.com',
        welcomeText: 'welcome',
        aboutText: 'text',
        facebookUrl:'urlface', 
        instagramUrl: 'urlinsta', 
        linkedinUrl: 'urllinkedin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'org2',
        image: 'org2',
        address: 'calle falsa 123',
        phone: 12345,
        email: 'email@email.com',
        welcomeText: 'welcome',
        aboutText: 'text',
        facebookUrl:'urlface', 
        instagramUrl: 'urlinsta', 
        linkedinUrl: 'urllinkedin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: 'org3',
        image: 'org3',
        address: 'calle falsa 123',
        phone: 12345,
        email: 'email@email.com',
        welcomeText: 'welcome',
        aboutText: 'text',
        facebookUrl:'urlface', 
        instagramUrl: 'urlinsta', 
        linkedinUrl: 'urllinkedin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }
    ]
      await queryInterface.bulkInsert('Organizations', organizations, {});

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
