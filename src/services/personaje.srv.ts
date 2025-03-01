import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Crea un personaje y lo asocia al usuario.
 * Valida que el nombre esté presente y luego crea el registro en la base de datos.
 */
export const createPersonajeSrv = async (userId: number, data: { nombre: string; foto: string }) => {
  // Verifica que el nombre esté presente
  if (!data.nombre) throw new Error("El nombre es requerido");
  // Crea el personaje asociándolo al usuario
  return prisma.personaje.create({
    data: {
      nombre: data.nombre,
      foto: data.foto,
      userId,
    },
  });
};

/**
 * Lista personajes:
 * - Si el rol es ADMIN, devuelve todos los personajes activos (flag true).
 * - Si el rol es REGULAR, devuelve solo los personajes asociados al usuario autenticado.
 */
export const getListaPersonajeSrv = async (userId: number, rol: string) => {
  if (rol === "ADMIN") {
    return prisma.personaje.findMany({ where: { flag: true } });
  } else {
    return prisma.personaje.findMany({ where: { userId, flag: true } });
  }
};

/**
 * Obtiene un personaje por su ID.
 * Verifica que, si el usuario no es ADMIN, el personaje pertenezca al usuario autenticado.
 */
export const getPersonajeSrv = async (id: number, userId: number, rol: string) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      // Si el rol no es ADMIN, se añade la condición de que el personaje pertenezca al usuario
      ...(rol !== "ADMIN" && { userId }),
    },
  });
  if (!personaje) {
    throw new Error("Personaje no encontrado o no tienes acceso");
  }
  return personaje;
};

/**
 * Realiza un soft delete de un personaje.
 * Verifica que el personaje exista y que, si el usuario no es ADMIN, pertenezca al usuario autenticado.
 * Luego, actualiza el registro para marcarlo como eliminado (flag: false).
 */
export const deletePersonajeSrv = async (id: number, userId: number, rol: string) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      ...(rol !== "ADMIN" && { userId }),
    },
  });
  if (!personaje) throw new Error("Personaje no encontrado o no tienes acceso");
  return prisma.personaje.update({
    where: { id },
    data: { flag: false },
  });
};

/**
 * Actualiza un personaje existente.
 * Verifica que el personaje exista (y pertenezca al usuario si no es ADMIN) y que se envíe un nombre.
 * Actualiza los datos del personaje en la base de datos.
 */
export const updatePersonajeSrv = async (
  id: number,
  userId: number,
  rol: string,
  data: { nombre: string; foto: string }
) => {
  const personaje = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      ...(rol !== "ADMIN" && { userId }),
    },
  });
  if (!personaje) throw new Error("Personaje no encontrado o no tienes acceso");
  if (!data.nombre) throw new Error("El nombre es requerido");

  return prisma.personaje.update({
    where: { id },
    data: {
      nombre: data.nombre,
      foto: data.foto,
    },
  });
};
