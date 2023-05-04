const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion')

const Presentation = sequelize.define('presentation', {
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
    tableName: 'presentations'
});

// `sequelize.define` also returns the model
// console.log(Presentation === sequelize.models.Presentation); // true

module.exports=Presentation;