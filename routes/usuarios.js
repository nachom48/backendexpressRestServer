//Las rutas relacionadas a los usuarios

//Aca defino las rutas relacionadas con los usuarios
import { Router } from "express";
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", usuariosGet);
router.get("*", usuariosGet);
router.put("/:usuarioId", usuariosPut);

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

export { router };
