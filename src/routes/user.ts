import { Router } from "express";
import {
  listUsersCtrl,
  getUserCtrl,
  updateUserCtrl,
  deleteUserCtrl,
} from "../controllers/user.ctrl";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Rutas protegidas que solo pueden acceder usuarios con rol ADMIN.
 * Se aplican dos middlewares: authMiddleware (para verificar el JWT) y adminMiddleware (para validar el rol).
 */

// Obtiene la lista de todos los usuarios
router.get("/list", authMiddleware, adminMiddleware, listUsersCtrl);

// Obtiene un usuario específico por su ID
router.get("/:id", authMiddleware, adminMiddleware, getUserCtrl);

// Actualiza la información de un usuario por su ID
router.put("/:id", authMiddleware, adminMiddleware, updateUserCtrl);

// Realiza un soft delete (elimina de forma lógica) un usuario por su ID
router.delete("/:id", authMiddleware, adminMiddleware, deleteUserCtrl);

export { router };
