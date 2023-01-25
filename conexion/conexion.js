const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tropical', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports=sequelize;