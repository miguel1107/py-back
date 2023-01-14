const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

exports.index = async (req,res,next)=>{
    conexion.query("SELECT * FROM zones WHERE state=1 ", async(error,results)=>{
        res.render('zonas',{data:results})
    });
};

exports.action = async (req,res,next)=>{
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    if (req.body.action == 'store') {
        conexion.query('INSERT INTO zones SET ?',{name:name,price:price,state:1},(error,results)=>{
            if(error){console.error(error);}
            res.redirect('/zonas');
        });
    } else {
        const upd = "UPDATE zones SET name='"+name+"',price='"+price+"' WHERE id='"+id+"'";
        conexion.query(upd,(error,results)=>{
            if(error){console.error(error);}
            res.redirect('/zonas');
        });
    }
};

exports.show = async (req,res,next)=>{
    try {
        const id = req.params.id;
        conexion.query('SELECT * FROM zones WHERE id='+id,(error,results)=>{
            if(error){console.error(error);}
            res.json({data:results[0]})
        });
    } catch (error) {
        console.log(error);
    } 
};

exports.delete = async (req, res,next)=>{
    try {
        const id = req.body.id;
        conexion.query('UPDATE zones SET state=0 WHERE id='+id,(error,results)=>{
            if(error){console.error(error);}
            res.json({state:1})
        });
    } catch (error) {
        console.log(error);
    }
};