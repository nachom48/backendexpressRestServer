import { response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";

const usuariosGet = async (req, res) => {
  // const { q, nombre, apikey, page = 10, limit } = req.query;

  //El limite es la cantidawd q quiero q vayan, y el skip es de desde donde quiero que vengan

  const { limite = 5, desde = 0 } = req.query;

  //El Promise.all me permite mandar un arreglo con todas promesas que quiero que se ejecuten
  //haciendo const[] hago una desestructuracion de arreglos

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).limit(limite).skip(desde),
  ]);

  res.status(403).json({
    total,
    usuarios,
  });
};

//Los post envian su data por el body
const usuariosPost = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const usuario = new Usuario({ nombre, email, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  //el hashSync es para encriptarlo en una sola via
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  await usuario.save();

  res.status(403).json({
    usuario,
  });
};

const usuariosPatch = (req, res) => {
  res.status(403).json({
    msg: "Patch API - CONTROLADOR",
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  //esta manera de desestructura me permite quedarme con el resto que es lo quiero modificar, lo que no quiero modificar lo saco lo dejo a un costado
  const { _id, password, google, email, ...resto } = req.body;

  //Todo validar contra base de datos el ID

  //Si viene el password quiere decir que quiere actualizar su contraseña
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.status(403).json({
    usuario,
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  //no conviene borrar un usuariuo xq se pierde la integridad referencial

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.status(403).json({
    usuario,
  });
};

export {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
};
