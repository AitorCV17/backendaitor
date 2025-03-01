import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Crea un usuario con rol REGULAR por defecto.
 * Primero verifica si el email ya está registrado.
 * Si no, encripta la contraseña y crea el usuario en la base de datos.
 */
export const createUserSrv = async (nombre: string, email: string, password: string) => {
  // Busca si ya existe un usuario con el email proporcionado
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("El email ya está registrado");
  }
  // Encripta la contraseña con bcrypt (10 salt rounds)
  const hashed = await bcrypt.hash(password, 10);
  // Crea el usuario con el rol por defecto "REGULAR"
  return prisma.user.create({
    data: {
      nombre,
      email,
      password: hashed,
      rol: "REGULAR"
    },
  });
};

/**
 * Busca un usuario por email, usado para el proceso de login.
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

/**
 * Lista todos los usuarios activos (flag true) de la base de datos.
 */
export const listUsersSrv = async () => {
  return prisma.user.findMany({ where: { flag: true } });
};

/**
 * Obtiene un usuario por su ID, solo si está activo (flag true).
 */
export const getUserByIdSrv = async (id: number) => {
  return prisma.user.findFirst({ where: { id, flag: true } });
};

/**
 * Actualiza los datos de un usuario (nombre, email, rol).
 */
export const updateUserSrv = async (id: number, data: { nombre?: string; email?: string; rol?: string }) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Realiza un soft delete de un usuario, marcando su flag como false.
 */
export const softDeleteUserSrv = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: { flag: false },
  });
};
