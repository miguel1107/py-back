const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

var bodyParser = require('body-parser')

const app = express();

/** motor de plantilla */
app.set('view engine','ejs')

/** carpeta public */
app.use(express.static('public'))

/** procesar datos */
// app.use(express.urlencoded({extended:false}))
// app.use(express.json())
// parse application/json
app.use(bodyParser.urlencoded({extended:true}));  
app.use(bodyParser.json())

/** variables de entorno */
dotenv.config({path: './env/.env'})

/** cookies */
app.use(cookieParser());

app.use(function(req,res,next){
    if(!req.user)
        res.header('Cache-control','private, no cache, no-store,must-revalidate')
    next();
});

/** router */
app.use('/',require('./routes/router'))
app.listen(process.env.PORT, ()=>{
    console.log('runnig..');
})