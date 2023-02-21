import { request, response } from "express";

export const esAdminRol = (req = request, res = response, next) => {
  //Error 500 es un error interno
  if (req.usario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }
  console.log(req.usuario);
  const { rol, nombre } = req.usuario;
  if (rol !== "Prueba Api") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede borrar usuarios`,
    });
  }
  next();
};

//Si el operador "Spread " o "rest" se usa en el argumento de una funcion sigfnifica que quiero el resto de los argumentos que vienen ahi
// y los transforma en un array

export const tieneRol = (...roles) => {
  console.log(roles);
  //Aqui recibo los arugmentos y retorno una funcion que es la que se va a ejecutar
  return (req, res = response, next) => {
    console.log(roles);
    if (req.usario) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }
    //Si pasa la verificacion es xq en el request tengo el usuario

    //Si no esta incluido ahi tiro el error
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: "El servicio requiere uno de estos roles ",
      });
    }
    next();
  };
};
