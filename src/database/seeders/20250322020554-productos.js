'use strict';

const productsJson = require('../../data/products.json');
const products = productsJson.map(({year,make,model,transmission, mileage,price,description}) => {
  return {
    year,
    makeId : make,
    patternId : model,
    transmissionId : transmission,
    stateId: 2,
    originId : 1,
    mileage,
    price,
    description,
    categoryId: 1,
    createdAt: new Date,
  updatedAt: new Date
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      products,
      {}
    );

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
