const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion')

const Client = sequelize.define('client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  document: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  state: {
    type: DataTypes.INTEGER,
  },
}, {
    tableName: 'clients'
});

// `sequelize.define` also returns the model
console.log(Client === sequelize.models.Client); // true

module.exports=Client;