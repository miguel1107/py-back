const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const mantenimientoController = require('../controllers/mantenimientosController')
const clienteController = require('../controllers/clientesController')
const presentationController = require('../controllers/presentationController')
const zoneController = require('../controllers/zoneController')
const roleController = require('../controllers/roleController')
const permissionController = require('../controllers/permissionController')

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


/** controller auth - usuario*/
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.get('/usuarios', authController.isAuthenticated,authController.index);
router.post('/user/action',authController.isAuthenticated,authController.action);
router.post('/user/delete', authController.isAuthenticated,authController.Delete);

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
router.post('/client/delete', authController.isAuthenticated,clienteController.Delete);
/** mantenimiento de presentaciones */
router.get('/presentaciones', authController.isAuthenticated,presentationController.index);
router.post('/presentation/action', authController.isAuthenticated,presentationController.action);
router.get('/presentation/show/:id', authController.isAuthenticated,presentationController.show);
router.post('/presentation/delete', authController.isAuthenticated,presentationController.Delete);
/** mantenimiento de zonas */
router.get('/zonas', authController.isAuthenticated,zoneController.index);
router.post('/zone/action', authController.isAuthenticated,zoneController.action);
router.get('/zone/show/:id', authController.isAuthenticated,zoneController.show);
router.post('/zone/delete', authController.isAuthenticated,zoneController.delete);

/** mantenimiento de roles */
router.get('/roles', authController.isAuthenticated,roleController.index);
router.post('/role/action', authController.isAuthenticated,roleController.action);
router.get('/role/show/:id', authController.isAuthenticated,roleController.show);
router.post('/role/delete', authController.isAuthenticated,roleController.delete);

/** mantenimiento de permisos */
router.get('/permisos', authController.isAuthenticated,permissionController.index);
router.post('/permission/action', authController.isAuthenticated,permissionController.action);
router.get('/permission/show/:id', authController.isAuthenticated,permissionController.show);
router.post('/permission/delete', authController.isAuthenticated,permissionController.delete);

module.exports=router;