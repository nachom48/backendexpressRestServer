import { response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generarJWT.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Verificar si el email existe
    //Si no existe significa q el usuario no esta registrado
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario no se encuentra registrado ",
      });
    }

    //El compareSync de Bcryipt compara las contraseñas (la q viene en el body) y la del usuario edl a base de datos y deveulve un booleano
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password no es correcta ",
      });
    }
    //Verificar si el usuario esta activo en mi base de datos
    if (usuario.estado === false) {
      return res.status(400).json({
        msg: "El usuario no se encuentra activo",
      });
    }
    //Verificar la contraseña

    //Generar el JWT

    const token = await generarJWT(usuario.id);
    return res.status(403).json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const authPost = async (req, res) => {
  res.status(403).json({
    msg: "Auth Post",
  });
};

export { login, authPost };
