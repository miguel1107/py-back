const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/conexion");
const Client = require("./Client");
const Zone = require('./Zone')

const sale = sequelize.define(
  "sale",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: "id",
      },
    },
    date:{
        type: DataTypes.DATEONLY,
    },
    amount:{
        type: DataTypes.DECIMAL,
    },
    phone:{
        type: DataTypes.STRING,
    },
    latitud:{
        type: DataTypes.STRING,
    },
    longitud:{
        type: DataTypes.STRING,
    },
    address:{
        type: DataTypes.STRING,
    },
    zoneId: {
        type: DataTypes.INTEGER,
        references: {
          model: Zone,
          key: "id",
        },
      },
    state: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "sales",
  }
);

sale.belongsTo(Client)

module.exports = sale;
