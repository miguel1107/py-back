const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DKDB_HOST,
        dialect: process.env.DB_DIAL,
        port: process.env.DB_PORT
    }
)

module.exports=sequelize