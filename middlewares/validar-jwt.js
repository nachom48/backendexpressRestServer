import { request, response } from "express";
import Jwt from "jsonwebtoken";
import usuario from "../models/usuario.js";
import Usuario from "../models/usuario.js";

//Los tokens de acceso se acostukmbra que vayan dentro de los Headers

//Middleware es una funcion

export const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  console.log("este es el token", token);
  //401 es Unauthorized

  //aca veo q venga token
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    //Esta funcion me verifica si el JWT que estoy enviando por header ne la peticion es valido, si no es valido va ad isparar el error
    const { uid } = Jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);
    console.log("Este es el usuario ", usuario);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido, usuario no existente BD",
      });
    }

    //aca busco el usuario por el UID y luego se lo doy en lo pongo en la Request al usario

    //req.uid=uid leyendo el modelo el usuario que corresponde la usuario id, lo almacenamos en req.usuario = ///

    ///Preguntar si el usuario no ha sido borrado

    if (usuario.estado === false) {
      return res.status(401).json({
        msg: "Token no valido xq el usuario tiene estado false",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "token no valido",
    });
  }

  console.log(token);
};
