const jwt = require("jsonwebtoken")

exports.generarJWT = ( uid = '' ) => {
    return new Promise ((resolve, reject) => {
        const payload = { uid }
        jwt.sign( payload, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA
        }, ( error, token ) => {
                if( error ){
                    console.log(error)
                    reject('No se pudo generar el token')
                }
                else{
                    resolve( token )
                }
        } )
    })
}

//module.export = generarJWT
/*export {
    generarJWT
}*/