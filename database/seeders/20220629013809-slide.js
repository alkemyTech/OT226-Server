'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const slides = [
      {
        imageUrl: 'image1',
        text: 'text1',
        order: 1,
        organizationId: 1,
        createdAt: '2022-19-07',
        updatedAt: '2022-19-07'
      },
      {
        imageUrl: 'image2',
        text: 'text2',
        order: 2,
        organizationId: 2,
        createdAt: '2022-19-07',
        updatedAt: '2022-19-07'
      },
      {
        imageUrl: 'image3',
        text: 'text3',
        order: 3,
        organizationId: 3,
        createdAt: '2022-19-07',
        updatedAt: '2022-19-07'
      },
      {
        imageUrl: 'image4',
        text: 'text4',
        order: 1,
        organizationId: 1,
        createdAt: '2022-19-07',
        updatedAt: '2022-19-07'
      },
      {
        imageUrl: 'image5',
        text: 'text5',
        order: 2,
        organizationId: 2,
        createdAt: '2022-19-07',
        updatedAt: '2022-19-07'
      },
      {
        imageUrl: 'image1',
        text: 'text6',
        order: 3,
        organizationId: 3,
        createdAt: '2022-19-07',
        updatedAt: '2022-19-07'
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
