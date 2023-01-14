const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

/** regiter */
exports.register = async (req,res)=>{
    try {
        const name = req.body.name;
        const user = req.body.user;
        const pass = req.body.pass;
        let hash = await bcryptjs.hash(pass,8);
        conexion.query('INSERT INTO users SET ?',{user:user,name:name,password:hash,role_id:1},(error,results)=>{
            if(error){console.error(error);}
            res.redirect('/');
            console.log(res);
        });
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req,res)=>{
    try {
        const user = req.body.user;
        const pass = req.body.pass;
        if ( !user || !pass ) {
            res.render('login',{
                alert: true,
                alertTitle: "Advertencia",
                alertMessage:"Ingrese usuario y contraseña",
                alertIcon:'info',
                showConfirmButton:true,
                timer:false,
                ruta: 'login'
            })
        }else{
            conexion.query("SELECT * FROM users WHERE user=?", [user], async(error,results)=>{
                if (results.length == 0 || !(await bcryptjs.compare(pass,results[0].password)) ) {
                    res.render('login',{
                        alert: true,
                        alertTitle: "Error",
                        alertMessage:"Usuario y/o contraseña incorrecta",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer:false,
                        ruta: 'login'
                    })
                }else{
                    const id = results[0].id;
                    const token = jwt.sign({id:id},process.env.JWT_SECRETO,{
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    console.log(token);

                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES*24 *60*60*1000),
                        httpOnly: true
                    };
                    res.cookie('jwt',token,cookiesOptions )
                    res.render('login',{
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage:"Login correcto",
                        alertIcon:'success',
                        showConfirmButton:false,
                        timer:800,
                        ruta: ''
                    })
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.isAuthenticated = async (req,res,next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query("SELECT * FROM users WHERE id=?",[decodificada.id],(error,results)=>{
                if (!results) {
                    return next();
                } 
                req.user = results[0];
                return next();
            })
        } catch (error) {
            console.log(error);
            return next();
        }
    }else{
        res.redirect('/login');
    }
}

exports.logout = async (req,res)=>{
    res.clearCookie('jwt');
    return res.redirect('/')
}