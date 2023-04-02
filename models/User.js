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
    allowNull: false
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
        model: Role, // 'Movies' would also work
        key: 'id'
      },
    allowNull: false
  },
}, {
    tableName: 'users'
});

module.exports=User;