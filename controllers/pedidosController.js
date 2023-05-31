/*const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')*/
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const moment = require('moment');

const Client = require('../models/Client')
const Product = require('../models/Product')
const ProductPresentation = require('../models/ProductPresentation')
const Presentation = require('../models/Presentation')
const Sale = require('../models/Sale');
const SaleDetail = require('../models/SaleDetail');
const Zone = require('../models/Zone');

exports.index = async (req,res,next)=>{
    try {
        let client = await Client.findAll(
            {
                where: {
                    state:1 
                }
            }
        );
        let data = [];
        data.push(client);
        let product = await Product.findAll(
            {
                where: {
                    state:1 
                },
            },
        );
        let zone = await Zone.findAll(
            {
                where: {
                    state:1 
                },
            },
        );
        res.render('order',{data:data,product:product,zone:zone})
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

exports.gerPresentation =  async (req, res, next)=>{
    try {
        const id = req.params.id;
        let presentation = await ProductPresentation.findAll(
            {
                where:{
                    productId:id,
                },
                include: Presentation
            }
        );
        res.json({data:presentation})
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

exports.store =  async (req, res, next)=>{
    try {
        let hoy = new Date();
        const order =  await Sale.create({
            clientId: req.body.client,
            date: hoy,
            amount:0.00,
            phone:req.body.phone,
            latitud:req.body.lat,
            longitud:req.body.lon,
            address:req.body.address,
            zoneId:req.body.zone[0],
            state:1
        });
        const carrito = (req.body.carrito);
        let total = 0;
        for (let index = 0; index < carrito.length; index++) {
            total += parseFloat(carrito[index]['quantity']) *  parseFloat(carrito[index]['price']);
            const det =  await SaleDetail.create({
                saleId: order.id,
                productPresentationId: carrito[index]['presentationId'],
                quantity:carrito[index]['quantity'],
                price:carrito[index]['price'],
            });
        }
        total += parseFloat(req.body.zone[1]);
        const upSale = await Sale.update({amount:total}, {
            where: {
              id: parseInt(order.id)
            }
          });
        res.json({order:order,state:1})
        // setTimeout(function () {
        //     res.redirect("/order");
        // }, 1000);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

exports.list = async (req,res,next)=>{
    try {
        let hoy = moment().format('YYYY-MM-DD');
        const pedidos = await Sale.findAll({
            where: {
                date: hoy,
            },
            include: Client        
        })
        res.render('list',{data:pedidos,desde:hoy,hasta:hoy,state:""})
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

exports.cancel = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const upSale = await Sale.update({state:6}, {
            where: {
              id: parseInt(id)
            }
          });
          res.json({state:0});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

exports.lstPost = async(req,res, next)=>{
    try {
        let desde = req.body.filerDateDesde;
        let hasta = req.body.filerDateHasta;
        let state = req.body.filerState;

        let pedidos = await Sale.findAll({
            where: {
                date:{
                    [Op.between]:[desde,hasta]
                },
            },
            include: Client
        })
        if (state == 0) {
            res.render('list',{data:pedidos,desde:desde,hasta:hasta,state:state})    
        }else{
            let temp = [];
            pedidos.forEach(element => {
                if (element.state == state) {
                    temp.push(element);
                }
            });
            pedidos = temp;
            res.render('list',{data:pedidos,desde:desde,hasta:hasta,state:state})
        }
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

exports.process = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const state = req.params.state;
        const upSale = await Sale.update({state:state}, {
            where: {
              id: parseInt(id)
            }
          });
          res.json({state:0});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

exports.detail = async(req,res,next)=>{
    try {
        let data = [];
        const id = req.params.id;
        const lista = await SaleDetail.findAll({
            where: {
                saleId: id,
            },
            include:[{
                model: ProductPresentation,
                include: [{model:Product},{model:Presentation}]
            }]
        })
        res.json({lista:lista});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};