const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

const Client = require('../models/Client')

exports.index = async (req,res,next)=>{
    try {
        let data = await Client.findAll(
            {
                where: {
                    state:1 
                }
            }
        );
        res.render('clientes',{data:data})
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    // conexion.query("SELECT * FROM clients WHERE state=1 ", async(error,results)=>{
    //     res.render('clientes',{data:results})
    // });
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
        conexion.query('INSERT INTO users SET ?',{user:document,name:complete,password:hash,roleId:2},(error,results)=>{
            if(error){console.error(error);}
            userId = results.insertId;
            try {
            const client = Client.create({document:document,name:name,last_name:last_name,email:email,user_id:userId });
            setTimeout(function(){
                res.redirect('/clientes');
            }, 1000);
            } catch (error) {
            console.error('Unable to connect to the database:', error);
            }
        });
    } else {
        const upClient = await Client.update({document:document,name:name,last_name:last_name,email:email }, {
            where: {
              id: parseInt(id)
            }
          });
        //   console.log(upClient);
          setTimeout(function(){
            res.redirect('/clientes');
        }, 1000);
        // const updUser = "UPDATE users SET name='"+complete+"',user='"+document+"',password='"+hash+"' WHERE id='"+req.body.userid+"'";
        // const updClient = "UPDATE clients SET document='"+document+"',name='"+name+"',last_name='"+last_name+"',email='"+email+"' WHERE id='"+id+"'";
        // conexion.query(updClient,(error,results)=>{
        //     if(error){console.error(error);}
        //     conexion.query(updUser,(error,results)=>{
        //         if(error){console.error(error);}
        //         res.redirect('/clientes');
                // console.log(res);
        //     });
        // });
    }
};

exports.show = async (req,res,next)=>{
    const id = req.params.id;
    try {
        let cliente = await Client.findAll({
            where: {
                id: parseInt(id)
            }
        });
        res.json({data:cliente[0]})
        } catch (error) {
        console.error("Unable to connect to the database:", error);
        }
    // conexion.query('SELECT * FROM clients WHERE id='+id,(error,results)=>{
    //     if(error){console.error(error);}
    //     res.json({data:results[0]})
    // });
};

exports.delete = async (req, res,next)=>{
    const id = req.body.id;
    try {
        const upClient = await Client.update({state:0 }, {
            where: {
              id: parseInt(id)
            }
          });
        res.json({state:1})
        } catch (error) {
        console.error("Unable to connect to the database:", error);
        }
    // conexion.query('SELECT * FROM clients WHERE id='+id,(error,results)=>{
    //     if(error){console.error(error);}
    //     res.json({data:results[0]})
    // });
};