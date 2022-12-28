const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

exports.index = async (req,res,next)=>{
    conexion.query("SELECT * FROM products ", async(error,results)=>{
        res.render('productos',{data:results})
    });
};

exports.store = async (req,res,next)=>{
    console.log(req.body);
    // res.json(req);1 
};