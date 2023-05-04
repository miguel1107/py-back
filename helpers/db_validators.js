
const obtMensajes = async(opc) => {
    let opciones = {}
    switch (opc) {
        case 1:
            opciones = {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o contraseña incorrecta",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: "login",
            }
            break
        case 2:
            opciones = {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "Login correcto",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 800,
                ruta: ""
            }
            break
        default:
            opciones = {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese usuario y contraseña",
                alertIcon: "info",
                showConfirmButton: true,
                timer: false,
                ruta: "login",
            }
            break
    }
    return opciones
}

module.exports = { obtMensajes }