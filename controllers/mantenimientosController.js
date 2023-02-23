const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

const Product = require('../models/Product')
const fs = require('fs');
const Presentation = require('../models/Presentation')
const prodcutPresentation = require('../models/ProductPresentation')
const ProductPresentation = require('../models/ProductPresentation')

exports.index = async (req,res,next)=>{
    try {
        let data = await Product.findAll(
            {
                where: {
                    state:1 
                }
            }
        );

        let presentaciones = await Presentation.findAll(
            {
                where: {
                    state:1 
                }
            },
        );

        let prdPresentation = await prodcutPresentation.findAll({
            where:{
                state:1
            },
            include: Presentation
        });

        res.render('productos',{data:data,presentaciones:presentaciones,prdPresentation:prdPresentation})
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};

exports.action = async (req,res,next)=>{
    let path = req.file.fieldname + '-' + req.file.originalname;
    const id = req.body.id;
    const name = req.body.name;

    if (req.body.action == 'store') {
        try {
            const prd = Product.create({name:name,image:path });
            setTimeout(function(){
                res.redirect('/productos');
            }, 500);
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
    } else {
        const upProduct = await Product.update({name:name,image:image }, {
            where: {
              id: parseInt(id)
            }
          });
        //   console.log(upProduct);
          setTimeout(function(){
            res.redirect('/productos');
        }, 1000);
    }
};

exports.show = async (req,res,next)=>{
    const id = req.params.id;
    try {
        let product = await Product.findAll({
            where: {
                id: parseInt(id)
            }
        });
        res.json({data:product[0]})
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
        const upProduct = await Product.update({state:0 }, {
            where: {
              id: parseInt(id)
            }
        });
        let product = await Product.findAll({
            where: {
                id: parseInt(id)
            }
        });
        
        const path = 'public/img/product/'+product[0].image;
        fs.unlink(path, (err) => {
            if (err) {
              console.error(err)
              res.json({state:0})
            }
            res.json({state:1})
          })
        
        } catch (error) {
        console.error("Unable to connect to the database:", error);
        }
};

/*** presentaciones */

exports.addpresentation = async (req,res,next)=>{
    try {
        let prodPresen = await ProductPresentation.create({productId:req.body.product_id, presentationId:req.body.presentation_id,price:req.body.price});
        res.json({state:0})
    } catch (error) {
        res.json({state:1})
        console.error('Unable to connect to the database:', error);
    }    

}

exports.delpresentation = async (req,res,next)=>{
    try {
        const id = req.body.id;
        const upProductPresen = await ProductPresentation.update({state:0 }, {
            where: {
              id: parseInt(id)
            }
        });
        res.json({state:0})
    } catch (error) {
        res.json({state:1})
        console.error('Unable to connect to the database:', error);
    }    

}