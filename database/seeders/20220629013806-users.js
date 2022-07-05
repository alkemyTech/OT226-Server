'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const generateUsers = [
      {
        firstName: "Gabriel", 
        lastName: "Corti", 
        email: "gabi@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Nicole", 
        lastName: "Rappoport", 
        email: "nicole@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Nicolas", 
        lastName: "Escudero", 
        email: "nico@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Nicolas", 
        lastName: "Altomonte", 
        email: "tenchu@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Andres", 
        lastName: "Rivera", 
        email: "andy@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "DAngello", 
        lastName: "Garcia", 
        email: "dangelo@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Raul", 
        lastName: "Espina", 
        email: "raoole@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Franco", 
        lastName: "Fernandez", 
        email: "franckfer@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Max", 
        lastName: "Power", 
        email: "max@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Homero", 
        lastName: "Simpsons", 
        email: "homer@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/c1/60/bd/c160bd8e590e78046db087667e89ffee.jpg", 
        roleId: 2, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Bart", 
        lastName: "Simpsons", 
        email: "bart@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Lisa", 
        lastName: "Simpsons", 
        email: "lisa@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Maggie", 
        lastName: "Simpsons", 
        email: "maggie@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Abraham", 
        lastName: "Simpsons", 
        email: "pecesdelinfierno@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Barney", 
        lastName: "Gomez", 
        email: "barney@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Moe", 
        lastName: "Sislak", 
        email: "moe@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Dr", 
        lastName: "Nick", 
        email: "holadrnick@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Montgomery", 
        lastName: "Burns", 
        email: "monty@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Marge", 
        lastName: "Simpsons", 
        email: "marge@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
      {
        firstName: "Ned", 
        lastName: "Flanders", 
        email: "ned@alkemy.com", 
        password: "$2b$10$KcuA62IqFajnGxyNwKDyk.Jwy9pcqz5Dh9TFbzQdPnNDad3W/6AKa", 
        photo: "https://i.pinimg.com/236x/b1/fa/d7/b1fad76501d2042726992b054aa586c7.jpg", 
        roleId: 1, 
        createdAt:new Date(), 
        updatedAt:new Date(),
        deletedAt: null
      },
    ]
     await queryInterface.bulkInsert('Users', generateUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Example:
     * await queryInterface.bulkDelete('Users', { roleId: 1 }, {});
     */
  }
};
