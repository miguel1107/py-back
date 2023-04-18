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
  },
  price:{
    type: DataTypes.DECIMAL,
  },
  state: {
    type: DataTypes.INTEGER,
  },
}, {
    tableName: 'zones'
});

// `sequelize.define` also returns the model
// console.log(Client === sequelize.models.Client); // true

module.exports=Zone;