const {promisify} = require('util')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const moment = require('moment');

const Client = require('../models/Client')
const Product = require('../models/Product')
const ProductPresentation = require('../models/ProductPresentation')
const Presentation = require('../models/Presentation')
const Sale = require('../models/Sale');
const SaleDetail = require('../models/SaleDetail');

exports.list = async (req,res,next)=>{
    try {
        let hoy = moment().format('YYYY-MM-DD');
        const prod = await SaleDetail.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total'],'productPresentationId'
            ],
            where: {
                createdAt: {
                  [Sequelize.Op.between]: [hoy, hoy]
                }
              },
            group: ['productPresentationId'],
            order: [[Sequelize.literal('1'), 'ASC']],
            include:[
                {
                    model: ProductPresentation,
                    include: [{model:Product},{model:Presentation}]
                }
            ]
        });
        const client = await Sale.findAll({
            attributes: [
              [Sequelize.fn('COUNT', Sequelize.col('*')), 'total'],
            ],
            include: Client,
            where: {
              date: {
                [Op.between]: [hoy, hoy],
              },
            },
            group: ['clientId'],
            order: Sequelize.literal('1 ASC'),
          });
        res.render('report',{prod:prod,desde:hoy,hasta:hoy,client:client})
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

exports.lstPost = async(req,res, next)=>{
    try {
        let desde = req.body.filerDateDesde;
        let hasta = req.body.filerDateHasta;

        const prod = await SaleDetail.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total'],'productPresentationId'
            ],
            where: {
                createdAt: {
                  [Sequelize.Op.between]: [desde, hasta]
                }
              },
            group: ['productPresentationId'],
            order: [[Sequelize.literal('1'), 'DESC']],
            include:[
                {
                    model: ProductPresentation,
                    include: [{model:Product},{model:Presentation}]
                }
            ]
        })

        const client = await Sale.findAll({
            attributes: [
              [Sequelize.fn('COUNT', Sequelize.col('*')), 'total'],
            ],
            where: {
              date: {
                [Op.between]: [desde, hasta],
              },
            },
            group: ['clientId'],
            order: Sequelize.literal('1 ASC'),
            include: Client,
          });
        res.render('report',{prod:prod,client:client,desde:desde,hasta:hasta})
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};