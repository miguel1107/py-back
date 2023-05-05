const db = require('mysql')

const conection = db.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE,
});

conection.connect( (error)=>{
    if (error) {
        console.log(error);
        return;
    }
    console.log('ok db');
})

module.exports = conection