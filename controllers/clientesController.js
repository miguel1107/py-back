const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

exports.index = async (req,res,next)=>{
    conexion.query("SELECT * FROM clients WHERE state=1 ", async(error,results)=>{
        res.render('clientes',{data:results})
    });
};

exports.action = async (req,res,next)=>{
    const document = req.body.document;
    const id = req.body.id;
    const name = req.body.name;
    const last_name = req.body.last_name;
    const complete= name + " "+ last_name;
    const email = req.body.email;
    const pass = req.body.document;
    /** crear usuario */
    let hash = await bcryptjs.hash(pass,8);
    let userId = 0;
    if (req.body.action == 'store') {
        conexion.query('INSERT INTO users SET ?',{user:document,name:complete,password:hash,role_id:2},(error,results)=>{
            if(error){console.error(error);}
            userId = results.insertId;
            conexion.query('INSERT INTO clients SET ?',{document:document,name:name,last_name:last_name,email:email,user_id:userId },(error,results)=>{
                if(error){console.error(error);}
                res.redirect('/clientes');
                // console.log(res);
            });
        });
    } else {
        const updUser = "UPDATE users SET name='"+complete+"',user='"+document+"',password='"+hash+"' WHERE id='"+req.body.userid+"'";
        const updClient = "UPDATE clients SET document='"+document+"',name='"+name+"',last_name='"+last_name+"',email='"+email+"' WHERE id='"+id+"'";
        conexion.query(updClient,(error,results)=>{
            if(error){console.error(error);}
            conexion.query(updUser,(error,results)=>{
                if(error){console.error(error);}
                res.redirect('/clientes');
                // console.log(res);
            });
        });
    }
};

exports.show = async (req,res,next)=>{
    try {
        const id = req.params.id;
        conexion.query('SELECT * FROM clients WHERE id='+id,(error,results)=>{
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
        conexion.query('UPDATE clients SET state=0 WHERE id='+id,(error,results)=>{
            if(error){console.error(error);}
            res.json({state:1})
        });
    } catch (error) {
        console.log(error);
    }
};