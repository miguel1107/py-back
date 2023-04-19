const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const {generarJWT} = require("../helpers/generar_jwt")
const Product = require("../models/Product");
const fs = require("fs")
const path = require("path");
const ProductPresentation = require("../models/ProductPresentation");
const Presentation = require("../models/Presentation");

/* login */
const login = async (req, res) => {
  try {
    const { user, pass } = req.body
    // verificar si el usuario existe
    const usuario = await User.findOne({where: { user }})
    if( !usuario ) return res.status(400).json({ msg: `Usuario o Contraseña incorrectos`})
    // Verificar si el usuario esta activo
    if( usuario.state === 0 ) return res.status(400).json({ msg: `Usuario o Contraseña incorrectos`})
    // Verificar la contraseña
    const validPass = bcryptjs.compareSync(pass, usuario.password)
    if( !validPass ) return res.status(400).json({ msg: `Usuario o Contraseña incorrectos`})
    // Generar JWT
    const token = await generarJWT(usuario.id)
    // Retornamos el token
    res.json({
      token,
      name: usuario.name
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(`Error: ${error}`)
  }
}

/* Recuperar contraseña */
const resetPassword = async (req, res) => {
  const { user } = req.body
  /*const userExists =*/ await User.findOne({where: { user, status: 1 }})
}

/* Restablecer token */
const revalidarToken = async (req, res) => {
  try {
    const { usuario } = req
  
    const token = await generarJWT( usuario.id )
  
    res.json({
        token,
        name: usuario.name
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(`Error: ${error}`)
  }
}

/* Get All Products */
const getAllProducts = async (req, res) => {
  try {
    let productos = []
    productos = await Product.findAll(
      {
        where: { state: 1 },
        include: [
          {
            model: ProductPresentation,
            attributes: ['price'],
            include: [
              {
                model: Presentation,
                attributes: ['name']
              }
            ] 
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    )
    productos = productos.map( (p) => {
        p.image = `data:image/gif;base64,${fs.readFileSync(path.join(__dirname, '../public/img/product/', p.image), 'base64')}`
        const {productpresentation, ...rest} = p.toJSON()
        const price = productpresentation ? productpresentation.price : 0
        const presentation = productpresentation.presentation.name
        return {
          ...rest,
          price,
          presentation
        }
      }
    )
    res.status(200).json(productos)
  } catch (error) {
    console.log(error)
    res.status(500).json(`Error: ${error}`)
  }
}

module.exports = { login, resetPassword, revalidarToken, getAllProducts }