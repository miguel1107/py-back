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
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
    tableName: 'clients'
});

// `sequelize.define` also returns the model
// console.log(Client === sequelize.models.Client); // true

module.exports=Client;