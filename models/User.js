const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion')
const Role = require('../models/Role')

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  user: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.INTEGER,
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
        model: Role, // 'Movies' would also work
        key: 'id'
      }
  },
}, {
    tableName: 'users'
});

module.exports=User;