const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");

const Role = require("../models/Role");

exports.index = async (req, res, next) => {
  try {
    let data = await Role.findAll({
      where: {
        state: 1,
      },
    });
    res.render("roles", { data: data });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

exports.action = async (req, res, next) => {
  const id = req.body.id;
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
  }
};

exports.show = async (req, res, next) => {
  const id = req.params.id;
  try {
    let role = await Role.findAll({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ data: role[0] });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

exports.delete = async (req, res, next) => {
  const id = req.body.id;
  try {
    const upRole = await Role.update(
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
};
