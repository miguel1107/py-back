const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/conexion");
const Sale = require("./Sale");
const ProductPresentation = require('./ProductPresentation')

const SaleDetail = sequelize.define(
  "sale_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    saleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Sale,
        key: "id",
      },
    },
    productPresentationId: {
        type: DataTypes.INTEGER,
        references: {
          model: ProductPresentation,
          key: "id",
        },
      },
    quantity:{
        type: DataTypes.DECIMAL,
    },
    price:{
        type: DataTypes.DECIMAL,
    },
  },
  {
    tableName: "sale_details",
  }
);

// `sequelize.define` also returns the model
// console.log(Client === sequelize.models.Client); // true

module.exports = SaleDetail;
