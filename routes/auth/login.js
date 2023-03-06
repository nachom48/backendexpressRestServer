import { Router } from "express";
import {
  authPost,
  googleSignIn,
  login,
} from "../../controllers/auth.controller.js";
import { check } from "express-validator";
import validarCampos from "../../middlewares/validar-campos.js";
//Aca tengo todso los endpoint relacionados con el login
const router = Router();

router.get("/login", login);
router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña").not().isEmpty(),
    validarCampos,
  ],
  login
);

//Aca creo un endpoint Post /google, q pasa por el check primero q tenga el id y luego lo valide,y luego ejecuta la funcion googleSignIn

router.post("/google", [
  check("id_token", "token de google es necesario").not().isEmpty(),
  validarCampos,
  googleSignIn,
]);

export { router };
