'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      mileage: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      makeId: {
        type: Sequelize.INTEGER,
        references : {
          model: {
            tableName: 'Makes'
          },
          key : 'id'
        }
      },
      patternId: {
        type: Sequelize.INTEGER,
        references : {
          model: {
            tableName: 'Patterns'
          },
          key : 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references : {
          model: {
            tableName: 'Categories'
          },
          key : 'id'
        }
      },
      stateId: {
        type: Sequelize.INTEGER,
        references : {
          model: {
            tableName: 'States'
          },
          key : 'id'
        }
      },
      transmissionId: {
        type: Sequelize.INTEGER,
        references : {
          model: {
            tableName: 'Transmissions'
          },
          key : 'id'
        }
      },
      originId: {
        type: Sequelize.INTEGER,
        references : {
          model: {
            tableName: 'Origins'
          },
          key : 'id'
        }
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};