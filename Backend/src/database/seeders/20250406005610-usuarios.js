'use strict';
const usersJson = require('../../data/users.json');
const users = usersJson.map(({ name, surname, email, password, image, token, validated, lock, rolId }) => {
  return {
    name,
    surname,
    email,
    password,
    image: image || 1, // Aseguramos que haya un valor por defecto si no está definido
    token: token || null,
    validated: validated || false,
    lock: lock || false,
    rolId: rolId || 1, // Valor por defecto para rolId si no está definido
    createdAt: new Date(),
    updatedAt: new Date()
  }
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};