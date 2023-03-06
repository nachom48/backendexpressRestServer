//Las rutas relacionadas a los usuarios

//Aca defino las rutas relacionadas con los usuarios
import { validarCampos, validarJWT, tieneRol } from "../middlewares/index.js";
import { check, param } from "express-validator";
import { Router } from "express";
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from "../controllers/usuarios.controller.js";
import {
  isRoleValid,
  isEmailValid,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";

const router = Router();

router.get(
  "/",

  usuariosGet
);

router.get("*", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un Id Valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(isRoleValid),
    validarCampos,
  ],

  usuariosPut
);

//los middleware van como un arreglo de middle en el medio,entre el metodo y la ruta
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(isEmailValid),
    check("password", "El password es obligatorio y mas de 6 letras").isLength({
      min: 6,
    }),
    check("rol").custom(isRoleValid),
    validarCampos,
  ],
  usuariosPost
);

//Seria custom((role)=> isRoleValid(role)) pero se puede simplificar como haciendo referencia a la funcion nada mas

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRol("Prueba Api"),
    //Este middleware fuerza que el usuario sea administrador
    // esAdminRol,
    param("id", "No es un Id Valido").isMongoId(),
    param("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

export { router };
