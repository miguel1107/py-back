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
            model: Product, // 'Movies' would also work
            key: 'id'
          }
    },
    presentationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Presentation, // 'Movies' would also work
            key: 'id'
          }
    },
  price:{
    type: DataTypes.DECIMAL,
  },
  state: {
    type: DataTypes.INTEGER,
  },
}, {
    tableName: 'product_presentations'
});


ProductPresentation.belongsTo(Product, { foreignKey: 'productId' });
Product.hasOne(ProductPresentation, { foreignKey: 'productId' })
ProductPresentation.belongsTo(Presentation, { foreignKey: 'presentationId' });
Presentation.hasOne(ProductPresentation, { foreignKey: 'presentationId' })


module.exports=ProductPresentation;