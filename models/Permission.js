const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion')

const Permission = sequelize.define('permission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.INTEGER,
  },
}, {
    tableName: 'permissions'
});

// `sequelize.define` also returns the model
// console.log(Client === sequelize.models.Client); // true

module.exports=Permission;