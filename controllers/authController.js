const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
//const conexion = require("../database/db");
const { promisify } = require("util");
const User = require('../models/User')
const Role = require('../models/Role')

/** index */
const index = async (req, res, next) => {
  try {
    let data = await User.findAll({
      where: {
        state: 1,
      },
    });
    let role = await Role.findAll({
      where:{
        state:1
      }
    });
    res.render("usuarios", { data: data, role:role });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

/** regiter */
const action = async (req, res) => {
  try {
    const { name, user, pass, role, action } = req.body;
    let hash = await bcryptjs.hash(pass, 8);
    if (action === "store") {
      try {
        /*const userStore =*/ 
        await User.create({
          name, user,
          password:hash,
          roleId:role
        });
        res.redirect("/usuarios");
        /*setTimeout(function () {
        }, 1000);*/
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
    }else{
      const upUser = await User.update(
        { name },
        {
          where: {
            id: parseInt(id),
          },
        }
      );
      res.redirect("/usuarios");
      /*setTimeout(function () {
      }, 1000);*/
    }
  } catch (error) {
    console.log(error);
  }
}

const Delete = async (req, res, next) => {
  const id = req.body.id;
  try {
    const upUser = await User.update(
      { state: 0 },
      {
        where: {
          id: parseInt(id),
        },
      }
    );
    res.json({ state: 1 });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const login = async (req, res) => {
  try {
    const { user, pass } = req.body
    if (!user || !pass) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese usuario y contraseña",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    } 
    else {
      res.render('login', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Usuario y/o contraseña incorrecta",
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      })
      /*conexion.query(
        "SELECT * FROM users WHERE user=?",
        [user],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(pass, results[0].password))
          ) {
            res.render("login", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario y/o contraseña incorrecta",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
          } else {
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            });

            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            }
            res.cookie("jwt", token, cookiesOptions);
            res.render("login", {
              alert: true,
              alertTitle: "Conexión exitosa",
              alertMessage: "Login correcto",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 800,
              ruta: ""
            });
          }
        }
      )*/ // aqui termina conexion.query
    }
  } catch (error) {
    console.log(error);
  }
}

const isAuthenticated = async (req, res, next) => {
  next()
  /*if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      conexion.query(
        "SELECT * FROM users WHERE id=?",
        [decodificada.id],
        (error, results) => {
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/login");
  }*/
}

const logout = async (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
}


module.exports = {
  index,
  action,
  Delete,
  login,
  isAuthenticated,
  logout
}