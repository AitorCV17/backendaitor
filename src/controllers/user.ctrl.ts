import { Request, Response } from "express";
import {
  listUsersSrv,
  getUserByIdSrv,
  updateUserSrv,
  softDeleteUserSrv,
} from "../services/user.srv";

// Controlador para obtener la lista de usuarios
export const listUsersCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // Llama al servicio que lista los usuarios
    const users = await listUsersSrv();
    // Responde con la lista de usuarios
    res.json({ data: users });
  } catch (error: any) {
    // En caso de error, responde con status 500 y el mensaje de error
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un usuario específico por su ID
export const getUserCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // Se extrae el ID del usuario de los parámetros de la URL
    const id = Number(req.params.id);
    // Llama al servicio para obtener el usuario por su ID
    const user = await getUserByIdSrv(id);
    // Si no se encuentra el usuario, responde con 404
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    // Responde con los datos del usuario encontrado
    res.json({ data: user });
  } catch (error: any) {
    // En caso de error, responde con status 500 y el mensaje de error
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar la información de un usuario
export const updateUserCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // Se extrae el ID del usuario desde la URL
    const id = Number(req.params.id);
    // Se obtienen los datos a actualizar del body
    const { nombre, email, rol } = req.body;
    // Llama al servicio que actualiza el usuario
    const updated = await updateUserSrv(id, { nombre, email, rol });
    // Responde con los datos actualizados del usuario
    res.json({ data: updated });
  } catch (error: any) {
    // En caso de error, responde con status 500 y el mensaje de error
    res.status(500).json({ error: error.message });
  }
};

// Controlador para realizar un soft delete (marcar como inactivo) a un usuario
export const deleteUserCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // Se extrae el ID del usuario a eliminar de los parámetros de la URL
    const id = Number(req.params.id);
    // Llama al servicio para realizar el soft delete
    const deleted = await softDeleteUserSrv(id);
    // Responde con el resultado de la operación
    res.json({ data: deleted });
  } catch (error: any) {
    // En caso de error, responde con status 500 y el mensaje de error
    res.status(500).json({ error: error.message });
  }
};
