const express = require('express')
const router = express.Router();
const { login, getAllProducts, revalidarToken } = require('../controllers/apiController');
const { validarJWT } = require('../middleware/validar_jwt');

router.post('/login', login)
router.get('/renew', [validarJWT], revalidarToken)
router.get('/product', [validarJWT], getAllProducts)
//router.get('/logout',apiController.logout);



module.exports=router;