const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/conexion');
const Presentation = require('./Presentation');
const Product = require('./Product');

const ProductPresentation = sequelize.define('productpresentation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
        model: Product,
        key: 'id'
    },
    allowNull: false
  },
  presentationId: {
    type: DataTypes.INTEGER,
    references: {
        model: Presentation,
        key: 'id'
    },
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
    tableName: 'product_presentations'
});


ProductPresentation.belongsTo(Product, { foreignKey: 'productId' });
Product.hasOne(ProductPresentation, { foreignKey: 'productId' })
ProductPresentation.belongsTo(Presentation, { foreignKey: 'presentationId' });
Presentation.hasOne(ProductPresentation, { foreignKey: 'presentationId' })


module.exports=ProductPresentation;