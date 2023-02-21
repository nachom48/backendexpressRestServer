import { Router } from "express";
import { authPost, login } from "../../controllers/auth.controller.js";
import { check } from "express-validator";
import validarCampos from "../../middlewares/validar-campos.js";

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

export { router };
