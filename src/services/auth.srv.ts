import { generateToken } from "../utils/jwt";
import { createUserSrv, findUserByEmail } from "./user.srv";
import bcrypt from "bcryptjs";

/**
 * Registra un usuario.
 * Llama al servicio que crea el usuario, pasando nombre, email y password.
 */
export const registerSrv = async (nombre: string, email: string, password: string) => {
  return createUserSrv(nombre, email, password);
};

/**
 * Login: valida credenciales y retorna un token JWT.
 */
export const loginSrv = async (email: string, password: string) => {
  // Busca el usuario por email
  const user = await findUserByEmail(email);
  // Verifica que el usuario exista y que esté activo (flag true)
  if (!user || !user.flag) {
    throw new Error("Credenciales inválidas");
  }
  // Compara la contraseña proporcionada con la contraseña encriptada del usuario
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }
  // Genera un token JWT con el id y rol del usuario
  const token = generateToken({ id: user.id, rol: user.rol });
  return { token };
};
