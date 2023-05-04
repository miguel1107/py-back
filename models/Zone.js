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
<<<<<<< HEAD
  },
  price:{
    type: DataTypes.DECIMAL,
  },
  state: {
    type: DataTypes.INTEGER,
  },
=======
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
>>>>>>> Dockerizada
}, {
    tableName: 'zones'
});

<<<<<<< HEAD
// `sequelize.define` also returns the model
// console.log(Client === sequelize.models.Client); // true

=======
>>>>>>> Dockerizada
module.exports=Zone;