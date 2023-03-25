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
    const { document, name, last_name, email, pass } = req.body
    
    const complete= name + " "+ last_name;
    /** crear usuario */
    let hash = await bcryptjs.hash(pass,8);
    let userId = 0;
    if (req.body.action == 'store') {
        conexion.query('INSERT INTO users SET ?',{user:document,name:complete,password:hash,roleId:2},(error,results)=>{
            if(error){console.error(error);}
            userId = results.insertId;
            try {
            //const client = Client.create({document:document,name:name,last_name:last_name,email:email,user_id:userId });
            const client = Client.create({document,name,last_name,email,user_id:userId });
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