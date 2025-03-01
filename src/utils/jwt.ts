import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

/**
 * Genera un token JWT.
 * Recibe un objeto payload, lo firma usando el secreto definido y establece una duración de 5 minutos.
 */
export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
};

/**
 * Verifica un token JWT.
 * Comprueba la validez del token utilizando el secreto y retorna el payload decodificado.
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
