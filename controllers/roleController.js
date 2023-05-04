/*const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");*/

const Role = require("../models/Role");

const index = async (req, res, next) => {
  try {
    const data = await Role.findAll({
      where: {
        state: 1,
      },
    })
    res.render("roles", { data })
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

const action = async (req, res, next) => {
  /*const id = req.body.id;
  const name = req.body.name;

  if (req.body.action == "store") {
    try {
      const role = Role.create({
        name: name,
      });
      setTimeout(function () {
        res.redirect("/roles");
      }, 1000);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  } else {
    const upRole = await Role.update(
      { name: name },
      {
        where: {
          id: parseInt(id),
        },
      }
    );
    //   console.log(upRole);
    setTimeout(function () {
      res.redirect("/roles");
    }, 1000);
  }*/
  try {
    const { id, name, action } = req.body
    action === "store" ? await Role.create({ name }) : await Role.update({ name }, { where: { id }})
    res.redirect("/roles")
  } catch (error) {
    console.error(error)
  }
}

const show = async (req, res, next) => {
  const id = req.params.id
  try {
    /*let role = await Role.findAll({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ data: role[0] });*/
    const data = await Role.findByPk(id)
    res.json({ data })
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

const Delete = async (req, res, next) => {
  const id = req.body.id;
  try {
    /*const upRole =*/ 
    await Role.update(
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