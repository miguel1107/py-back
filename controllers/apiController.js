const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");
const User = require("../models/User");
const Role = require("../models/Role");

/** login */
exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const pass = req.body.pass;
    if (user != undefined && user != null && user.length > 0) {
      if (pass != undefined && pass != null && pass.length > 0) {
        let log = await User.findAll({
          where: {
            user: user,
          },
        });
        if (
          log.length == 0 ||
          !(await bcryptjs.compare(pass, log[0].password))
        ) {
          res
            .status(500)
            .json({ message: "Usuario y/o contraseña incorrecta" });
        } else {
          const id = log[0].id;
          const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA,
          });
          const cookiesOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("jwt", token, cookiesOptions);
          res
            .status(200)
            .json({ message: "Login correcto", token: token, data: log });
        }
      } else {
        res.status(500).json({ message: "Debe ingresar una contraseña" });
      }
    } else {
      res.status(500).json({ message: "Debe ingresar un usuario" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
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
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Logout correcto" });
};
