'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Transmissions", [
        {
          name : "Manual",
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          name : "Automática",
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
