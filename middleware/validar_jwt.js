const { request, response } = require ('express')
const jwt = require ('jsonwebtoken')
const User = require ('../models/User')


exports.validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if( !token ) return res.status(401).json({error: 'Usted no esta logueado en la aplicación'})
    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRETO )
        const usuario = await User.findByPk(uid)

        if ( usuario.state === 0 || !usuario ) {
            res.status(401).json({
                msg: 'Token no valido'
            })
        }

        req.usuario = usuario
        
        next()
    } catch (error) {
        console.log(`Error: ${error}`)
        return res.status(401).json({error})
    }
}

/*export{
    validarJWT
}*/