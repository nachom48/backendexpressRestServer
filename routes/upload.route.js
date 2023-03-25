import { Router } from "express";
import { check } from "express-validator";
import { actualizarImagenCloudinary, cargarArchivos,mostrarImagen } from "../controllers/upload.controller.js";
import { validarColeccionesPermitidas } from "../helpers/db-validators.js";
import validarCampos from "../middlewares/validar-campos.js";
import { validarArchivoASubir } from "../middlewares/validarArchivo.js";



const router = Router();


router.post('/',validarArchivoASubir, cargarArchivos)

router.put('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => validarColeccionesPermitidas(c,['usuarios','productos'])),
    validarArchivoASubir,
    validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => validarColeccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
], mostrarImagen)



export { router };
