const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')


/** vistas */
router.get('/', authController.isAuthenticated,(req,res)=>{
    res.render('index',{user:req.user})
});

router.get('/login',(req,res)=>{
    res.render('login',{alert:false})
});

/** controller auth */
router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/logout',authController.logout);

module.exports=router;