const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const mantenimientoController = require('../controllers/mantenimientosController')


/** vistas */

router.get('/login',(req,res)=>{
    res.render('login',{alert:false})
});

router.get('/', authController.isAuthenticated,(req,res)=>{
    res.render('index',{user:req.user})
});


/** controller auth */
router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
/** controller mantenimiento */
router.get('/productos', authController.isAuthenticated,mantenimientoController.index);
router.post('/product/register',authController.isAuthenticated,mantenimientoController.store);

module.exports=router;