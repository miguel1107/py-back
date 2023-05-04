/*const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')*/
const Zone = require('../models/Zone')

const index = async (req,res,next)=>{
    /*conexion.query("SELECT * FROM zones WHERE state=1 ", async(error,results)=>{
        res.render('zonas',{data:results})
    });*/
    try {
        const results = await Zone.findAll({ where: { state: 1 } })
        res.render('zonas',{data:results})
    } catch (error) {
        console.log(error)
    }
}

const action = async (req,res,next)=>{
    try {
        /*const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        if (action == 'store') {
            res.redirect('/zonas')
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
        }*/
        const { id, name, action } = req.body
        action === 'store' ? await Zone.create({name, state: 1}) : await Zone.update({name, state}, { where: { id } })
        res.redirect('/zonas')
    } catch (error) {
        console.log(error)
    }
}

const show = async (req,res,next)=>{
    try {
        const id = req.params.id
        const result = await Zone.findByPk(id)
        res.json({data: result})
        /*conexion.query('SELECT * FROM zones WHERE id='+id,(error,results)=>{
            if(error){console.error(error);}
            res.json({data:results[0]})
        });*/
    } catch (error) {
        console.log(error);
    } 
}

const Delete = async (req, res,next)=>{
    try {
        const id = req.body.id
        await Zone.update({ state: 0 }, { where: { id } })
        res.json({ state: 1 })
        /*conexion.query('UPDATE zones SET state=0 WHERE id='+id,(error,results)=>{
            if(error){console.error(error);}
            res.json({state:1})
        });*/
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    index,
    action,
    show,
    Delete
}