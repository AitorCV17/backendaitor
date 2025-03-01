import { Request, Response, NextFunction } from "express";
import { generateToken, verifyToken } from "../utils/jwt";

/**
 * Middleware de autenticación.
 * Verifica el token JWT, asigna la información del usuario a la request y refresca el token.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Obtiene el header de autorización
    const header = req.headers.authorization;
    if (!header) {
      // Si no hay token, responde con 401 Unauthorized
      res.status(401).json({ error: "Ningún token proporcionado" });
      return;
    }
    // Extrae el token del header (formato "Bearer <token>")
    const token = header.split(" ")[1];
    // Verifica y decodifica el token
    const decoded = verifyToken(token) as { id: number; rol: string };
    // Asigna los datos del usuario decodificado a la request
    (req as any).user = decoded;

    // Refresca el token generando uno nuevo con la misma información
    const newToken = generateToken({ id: decoded.id, rol: decoded.rol });
    // Establece el nuevo token en el header de la respuesta
    res.setHeader("Authorization", `Bearer ${newToken}`);

    // Continúa con la siguiente función en la cadena de middlewares
    next();
  } catch (error) {
    // En caso de error en la verificación, responde con 401 Unauthorized
    res.status(401).json({ error: "Token inválido" });
  }
};

/**
 * Middleware para verificar que el usuario tenga rol ADMIN.
 */
export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Obtiene la información del usuario que fue asignada por authMiddleware
  const user = (req as any).user;
  if (user?.rol !== "ADMIN") {
    // Si el rol no es ADMIN, responde con 403 Forbidden
    res.status(403).json({ error: "Se requiere rol ADMIN" });
    return;
  }
  // Si el rol es ADMIN, continúa con la siguiente función en la cadena de middlewares
  next();
};
