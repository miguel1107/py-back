const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const mantenimientoController = require('../controllers/mantenimientosController')
const clienteController = require('../controllers/clientesController')
const presentationController = require('../controllers/presentationController')
const zoneController = require('../controllers/zoneController')

var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/product/');
    },
    filename: function (req, file, cb) {
        // let ar = file.originalname.split('.');
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

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
router.post('/product/action', upload.single('file'),authController.isAuthenticated,mantenimientoController.action);
router.get('/product/show/:id', authController.isAuthenticated,mantenimientoController.show);
router.post('/product/delete', authController.isAuthenticated,mantenimientoController.delete);
router.post('/product/addpresentation', authController.isAuthenticated,mantenimientoController.addpresentation);
router.post('/product/delpresentation', authController.isAuthenticated,mantenimientoController.delpresentation);

/** mantenimiento de clientes */
router.get('/clientes', authController.isAuthenticated,clienteController.index);
router.post('/client/action', /*authController.isAuthenticated,*/clienteController.action);
router.get('/client/show/:id', authController.isAuthenticated,clienteController.show);
router.post('/client/delete', authController.isAuthenticated,clienteController.delete);
/** mantenimiento de presentaciones */
router.get('/presentaciones', authController.isAuthenticated,presentationController.index);
router.post('/presentation/action', authController.isAuthenticated,presentationController.action);
router.get('/presentation/show/:id', authController.isAuthenticated,presentationController.show);
router.post('/presentation/delete', authController.isAuthenticated,presentationController.delete);
/** mantenimiento de zonas */
router.get('/zonas', authController.isAuthenticated,zoneController.index);
router.post('/zone/action', authController.isAuthenticated,zoneController.action);
router.get('/zone/show/:id', authController.isAuthenticated,zoneController.show);
router.post('/zone/delete', authController.isAuthenticated,zoneController.delete);

module.exports=router;