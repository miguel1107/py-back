const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

exports.index = async (req,res,next)=>{
    conexion.query("SELECT * FROM presentations WHERE state=1 ", async(error,results)=>{
        res.render('presentaciones',{data:results})
    });
};

exports.action = async (req,res,next)=>{
    const id = req.body.id;
    const name = req.body.name;
    if (req.body.action == 'store') {
        conexion.query('INSERT INTO presentations SET ?',{name:name,state:1},(error,results)=>{
            if(error){console.error(error);}
            res.redirect('/presentaciones');
        });
    } else {
        const upd = "UPDATE presentations SET name='"+name+"' WHERE id='"+id+"'";
        conexion.query(upd,(error,results)=>{
            if(error){console.error(error);}
            res.redirect('/presentaciones');
        });
    }
};

exports.show = async (req,res,next)=>{
    try {
        const id = req.params.id;
        conexion.query('SELECT * FROM presentations WHERE id='+id,(error,results)=>{
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
        conexion.query('UPDATE presentations SET state=0 WHERE id='+id,(error,results)=>{
            if(error){console.error(error);}
            res.json({state:1})
        });
    } catch (error) {
        console.log(error);
    }
};