'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn(
          'Organizations',
          'facebookUrl', 
          {
            type: Sequelize.STRING
          }, { transaction: t }),
        queryInterface.addColumn(
          'Organizations',
          'instagramUrl', 
          {
            type: Sequelize.STRING
          }, { transaction: t }),
        queryInterface.addColumn(
          'Organizations',
          'linkedinUrl', 
          {
            type: Sequelize.STRING
          }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.removeColumn('Organizations', 'facebookUrl', { transaction: t }),
        queryInterface.removeColumn('Organizations', 'instagramUrl', { transaction: t }),
        queryInterface.removeColumn('Organizations', 'linkedinUrl', { transaction: t }),
      ]);
    });
  }
};
