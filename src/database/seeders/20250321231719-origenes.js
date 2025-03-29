'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Origins", [
        {
          country: "Argentina",
          flag : null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "Brasil",
          flag : null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "Japón",
          flag : null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "Alemania",
          flag : null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "Francia",
          flag : null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Origins', null, {});
  }
};
