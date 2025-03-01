import { Router } from "express";
import {
  createPersonajeCtrl,
  getListaPersonajeCtrl,
  getPersonajeCtrl,
  deletePersonajeCtrl,
  updatePersonajeCtrl,
} from "../controllers/personaje.ctrl";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Rutas protegidas que requieren autenticación mediante JWT.
 */

// Crea un nuevo personaje (requiere autenticación)
router.post("/", authMiddleware, createPersonajeCtrl);

// Obtiene la lista de personajes (según el rol y el usuario autenticado)
router.get("/list", authMiddleware, getListaPersonajeCtrl);

// Obtiene un personaje específico por su ID (según el usuario y rol)
router.get("/only/:id", authMiddleware, getPersonajeCtrl);

// Realiza un soft delete de un personaje por su ID
router.delete("/:id", authMiddleware, deletePersonajeCtrl);

// Actualiza un personaje específico (se identifica mediante ID en la URL)
router.put("/:id", authMiddleware, updatePersonajeCtrl);

export { router };
