'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const slides = [
      {
        imageUrl: 'image1.png',
        text: 'text1',
        order: 1,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: 'image2.png',
        text: 'text2',
        order: 2,
        organizationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: 'image3.png',
        text: 'text3',
        order: 3,
        organizationId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: 'image4.png',
        text: 'text4',
        order: 1,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: 'image5.png',
        text: 'text5',
        order: 2,
        organizationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: 'image1.png',
        text: 'text6',
        order: 3,
        organizationId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    await queryInterface.bulkInsert('Slides', slides, {});
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
