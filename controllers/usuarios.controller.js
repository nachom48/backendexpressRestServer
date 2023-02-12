import { response } from "express";

const usuariosGet = (req, res) => {
  const { q, nombre, apikey, page = 10, limit } = req.query;

  res.status(403).json({
    msg: "Get API - CONTROLADOR",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.status(403).json({
    msg: "Post API - CONTROLADOR",
    nombre,
    edad,
  });
};

const usuariosPatch = (req, res) => {
  res.status(403).json({
    msg: "Patch API - CONTROLADOR",
  });
};

const usuariosPut = (req, res) => {
  console.log(req);
  const id = req.params.usuarioId;
  res.status(403).json({
    msg: "Put - CONTROLADOR",
    id,
  });
};

const usuariosDelete = (req, res) => {
  res.status(403).json({
    msg: "Delete API - CONTROLADOR",
  });
};

export {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
};
