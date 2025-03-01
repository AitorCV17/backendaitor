import { Request, Response } from "express";
import {
  createPersonajeSrv,
  getListaPersonajeSrv,
  getPersonajeSrv,
  deletePersonajeSrv,
  updatePersonajeSrv,
} from "../services/personaje.srv";

// Crea un personaje y lo asocia al usuario autenticado
export const createPersonajeCtrl = async (req: Request, res: Response) => {
  try {
    // Se obtiene el ID del usuario autenticado desde el token
    const userId = (req as any).user.id;
    // Se obtiene la data enviada en el body de la petición
    const data = req.body;
    // Se llama al servicio para crear el personaje
    const personaje = await createPersonajeSrv(userId, data);
    // Responde con el personaje creado y status 201 (creado)
    res.status(201).json({ data: personaje, success: true });
  } catch (error: any) {
    // En caso de error, responde con status 400 y el mensaje del error
    res.status(400).json({ error: error.message });
  }
};

// Obtiene la lista de personajes según el rol y el usuario autenticado
export const getListaPersonajeCtrl = async (req: Request, res: Response) => {
  try {
    // Se extraen el ID y rol del usuario del token
    const userId = (req as any).user.id;
    const rol = (req as any).user.rol;
    // Se llama al servicio para obtener la lista de personajes
    const personajes = await getListaPersonajeSrv(userId, rol);
    // Responde con la lista de personajes
    res.json({ data: personajes });
  } catch (error: any) {
    // En caso de error, responde con status 500 (error de servidor)
    res.status(500).json({ error: error.message });
  }
};

// Obtiene un único personaje por ID, validando que el usuario tenga acceso
export const getPersonajeCtrl = async (req: Request, res: Response) => {
  try {
    // Se obtiene el ID del personaje de los parámetros de la URL
    const id = Number(req.params.id);
    // Se extraen el ID y rol del usuario autenticado
    const userId = (req as any).user.id;
    const rol = (req as any).user.rol;
    // Se llama al servicio para obtener el personaje
    const personaje = await getPersonajeSrv(id, userId, rol);
    // Responde con el personaje encontrado
    res.json({ data: personaje });
  } catch (error: any) {
    // Si no se encuentra o no se tiene acceso, responde con status 404
    res.status(404).json({ error: error.message });
  }
};

// Realiza un soft delete (marca como eliminado) de un personaje
export const deletePersonajeCtrl = async (req: Request, res: Response) => {
  try {
    // Se obtiene el ID del personaje de los parámetros de la URL
    const id = Number(req.params.id);
    // Se extraen el ID y rol del usuario autenticado
    const userId = (req as any).user.id;
    const rol = (req as any).user.rol;
    // Se llama al servicio para eliminar (soft delete) el personaje
    const personaje = await deletePersonajeSrv(id, userId, rol);
    // Responde con el resultado de la operación
    res.json({ data: personaje });
  } catch (error: any) {
    // En caso de error, responde con status 400 y el mensaje del error
    res.status(400).json({ error: error.message });
  }
};

// Actualiza un personaje existente
export const updatePersonajeCtrl = async (req: Request, res: Response) => {
  try {
    // Se obtiene el ID del personaje de los parámetros de la URL
    const id = Number(req.params.id);
    // Se extraen los nuevos datos (nombre y foto) del body
    const { nombre, foto } = req.body;
    // Se extraen el ID y rol del usuario autenticado
    const userId = (req as any).user.id;
    const rol = (req as any).user.rol;
    // Se llama al servicio para actualizar el personaje
    const personaje = await updatePersonajeSrv(id, userId, rol, { nombre, foto });
    // Responde con el personaje actualizado
    res.json({ data: personaje });
  } catch (error: any) {
    // En caso de error, responde con status 400 y el mensaje del error
    res.status(400).json({ error: error.message });
  }
};
