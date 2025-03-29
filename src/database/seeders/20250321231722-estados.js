'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "States", [
        {
          name : "0 km",
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          name : "Usado",
          createdAt : new Date,
          updatedAt : new Date
        }
      ],
      {}
    );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transmissions', null, {});
  
  }
};
