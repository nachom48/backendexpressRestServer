import { Router } from "express";
import { validarCampos, validarJWT, tieneRol, esAdminRol } from "../middlewares/index.js";
import {
  productosDelete,
  obtenerProductos,
  createProducto,
  obtenerProductoById,
  actualizarProducto,
} from "../controllers/productos.controller.js";
import { check, param } from "express-validator";
import { existeProductoPorId } from "../helpers/db-validators.js";
import { existeCategoriaPorId } from "../helpers/db-validators.js";


const router = Router();


router.get(
    "/",
    obtenerProductos
  );
  

  router.get("/:id",
    [
      check('id','No es un ID de Mongo').isMongoId(),
      check('id').custom(existeProductoPorId),
      validarCampos
    ],
     obtenerProductoById);

  router.put(
    "/:id"
   ,
   [
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
  ],
    actualizarProducto
  );
  
  router.post(
    "/",[
      validarJWT,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      check('categoria','La categoria no es un ID de mongo ').isMongoId(),
      check('categoria').custom(existeCategoriaPorId),
      validarCampos
    ]
    ,
    createProducto
  );
  
  
  router.delete(
    "/:id",[
    validarJWT,
    esAdminRol,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos],
    productosDelete
  );
  
  
  export { router };