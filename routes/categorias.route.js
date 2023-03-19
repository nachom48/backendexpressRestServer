import { Router } from "express";
import { validarCampos, validarJWT, tieneRol, esAdminRol } from "../middlewares/index.js";
import {
  categoriasDelete,
  obtenerCategorias,
  createCategoria,
  obtenerCategoriaById,
  actualizarCategoria,
} from "../controllers/categorias.controller.js";
import { check, param } from "express-validator";
import { existeCategoriaPorId } from "../helpers/db-validators.js";


const router = Router();


router.get(
    "/",
    obtenerCategorias
  );
  

  router.get("/:id",
    [
      check('id','No es un ID de Mongo').isMongoId(),
      check('id').custom(existeCategoriaPorId),
      validarCampos
    ],
     obtenerCategoriaById);

  router.put(
    "/:id"
   ,
   [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
  ],
    actualizarCategoria
  );
  
  router.post(
    "/",[
      validarJWT,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      validarCampos
    ]
    ,
    createCategoria
  );
  
  
  router.delete(
    "/:id",[
    validarJWT,
    esAdminRol,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos],
    categoriasDelete
  );
  
  
  export { router };