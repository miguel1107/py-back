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
//   product_id: {
//     type: DataTypes.INTEGER,
//   },
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

// `sequelize.define` also returns the model
// console.log(productPresentation === sequelize.models.productPresentation); // true

ProductPresentation.belongsTo(Product, { foreignKey: 'productId' });
ProductPresentation.belongsTo(Presentation, { foreignKey: 'presentationId' });
// Product.belongsToMany(Presentation, { through: ProductPresentation });
// Presentation.belongsToMany(Product, { through: ProductPresentation });

module.exports=ProductPresentation;