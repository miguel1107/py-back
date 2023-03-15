const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion')

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.INTEGER,
  },
}, {
    tableName: 'products'
});

// `sequelize.define` also returns the model
// console.log(Product === sequelize.models.Product); // true

module.exports=Product;