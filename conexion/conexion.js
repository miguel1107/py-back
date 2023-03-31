const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER, 
    '', 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIAL,
        port: process.env.DB_PORT
    }
);

module.exports=sequelize;