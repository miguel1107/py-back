const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');
//const ProductPresentation = require('./ProductPresentation');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
    tableName: 'products'
});

//Product.hasOne(ProductPresentation/*,{ foreignKey: 'productId'}*/)

// `sequelize.define` also returns the model
// console.log(Product === sequelize.models.Product); // true

module.exports=Product;