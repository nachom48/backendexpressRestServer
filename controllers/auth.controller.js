import { response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generarJWT.js";
import { googleVerify } from "../helpers/google-verify.js";

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

const googleSignIn = async (req, res = response) => {
  //aca recibe el token q viene en el body, lo desestrctura , llama a la funcion googleVerify para poder extraer info del token, el nombre img y email, luego
  //busco un usuario cno ese email y si no existe ,creo un usuario nuevo con toda la ino que tengo y guardo el usuario ,finalmente muestro e l suario y el token
  const { id_token } = req.body;

  try {
    const { nombre, img, email } = await googleVerify(id_token);

    //GENERAR LA REFERENCIA PARA VER SI E LCORREO EXISTE NE LA BASE DE DATOS

    let usuario = await Usuario.findOne({ email });
    console.log("este es el usuario encontrado ", usuario);
    if (!usuario) {
      //Si no existe tengo que crearl oal usuario<
      console.log("entro aca xq no existe el usuario");
      const data = {
        nombre,
        email,
        img,
        password: "aa",
        google: true,
      };
      console.log("esta es lad ata", data);
      usuario = new Usuario(data);
      console.log("Este es el usuario que estoy creando ", usuario);
      await usuario.save();
      console.log("aca ya deberia estar guardado");
    }

    //Si el usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador,usuario bloqueado",
      });
    }
    console.log("Este es el usuario creado al final ", usuario);
    //Generar el JWT y tengo la funcion hecha
    const token = await generarJWT(usuario.id);
    console.log("aca creo el token este", token);
    res.json({
      usuario,
      token,
    });
  } catch (error) {}
};

const authPost = async (req, res) => {
  res.status().json({
    msg: "Auth Post",
  });
};

export { login, authPost, googleSignIn };
