'use strict';

const makesJSON = require('../../data/makes.json');
const makes = makesJSON.map(make => ({
  name: make,
  originId : 1,
  createdAt: new Date(),
  updatedAt: new Date()
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Makes", makes,
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Makes', null, {});
  }
};
