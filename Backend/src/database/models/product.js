'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId'
      });

      Product.belongsTo(models.Make, {
        as: 'make',
        foreignKey: 'makeId'
      });

      Product.belongsTo(models.Pattern, {
        as: 'model',
        foreignKey: 'patternId'
      });

      Product.belongsTo(models.Transmission, {
        as: 'transmission',
        foreignKey: 'transmissionId'
      });

      Product.belongsTo(models.State, {
        as: 'state',
        foreignKey: 'stateId'
      });

      Product.belongsTo(models.Origin, {
        as: 'origin',
        foreignKey: 'originId'
      });
      
      Product.hasMany(models.Image, {
        as: 'images',
        foreignKey: 'productId'
      });
    }
  }
  Product.init({
    year: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    mileage: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    makeId: DataTypes.INTEGER,
    patternId: DataTypes.INTEGER,
    stateId : DataTypes.INTEGER,
    transmissionId : DataTypes.INTEGER,
    originId : DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};