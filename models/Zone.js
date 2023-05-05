const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion')

const Zone = sequelize.define('zone', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
    tableName: 'zones'
});

module.exports=Zone;