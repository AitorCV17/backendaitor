import { Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth.ctrl";
import { body } from "express-validator";

const router = Router();

/**
 * Registro de usuario.
 * Valida que el nombre no esté vacío, que el email sea válido y que la contraseña tenga al menos 6 caracteres.
 */
router.post(
  "/register",
  [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("email").isEmail().withMessage("Email inválido"),
    body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
  ],
  registerCtrl
);

/**
 * Inicio de sesión (login).
 * Valida que el email sea válido y que la contraseña tenga al menos 6 caracteres.
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
  ],
  loginCtrl
);

export { router };
