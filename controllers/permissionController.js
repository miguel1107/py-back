/*const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");*/

const Permision = require("../models/Permission");

const index = async (req, res, next) => {
  try {
    //let data = await Permision.findAll({
    const data = await Permision.findAll({
      where: {
        state: 1,
      },
    })
    //res.render("permisos", { data: data });
    res.render("permisos", { data });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const action = async (req, res, next) => {
  /*const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  if (req.body.action == "store") {
    try {
      const permision = Permision.create({
        name: name,
        description: description
      })
      setTimeout(function () {
        res.redirect("/permisos")
      }, 1000);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  } else {
    const upPermision = await Permision.update(
      { name: name , description:description},
      {
        where: {
          id: parseInt(id),
        },
      }
    );
    //   console.log(upPermision);
    setTimeout(function () {
      res.redirect("/permisos");
    }, 1000);
  }*/
  try {
    const { id, name, description, action } = req.body
    action === "store" ? await Permision.create({ name, description }) : await Permision.update({ name, description }, { where: { id: parseInt(id) } })
    res.redirect("/permisos")
  } catch (error) {
    console.error(error)
  }
}

const show = async (req, res, next) => {
  const id = req.params.id;
  try {
    /*let permision = await Permision.findAll({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ data: permision[0] });*/
    const data = await Permision.findByPk(id)
    res.json({ data })
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const Delete = async (req, res, next) => {
  const id = req.body.id;
  try {
    /*const upPermision =*/ 
    await Permision.update(
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

module.exports = {
  index,
  action,
  show,
  Delete
}