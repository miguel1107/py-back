const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion')

const Role = sequelize.define('role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
    tableName: 'roles'
});

// `sequelize.define` also returns the model
// console.log(Client === sequelize.models.Client); // true

module.exports=Role;