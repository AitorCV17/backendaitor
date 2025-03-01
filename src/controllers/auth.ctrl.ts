import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerSrv, loginSrv } from "../services/auth.srv";

// Controlador para el registro de un nuevo usuario
export const registerCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // Se valida la request para verificar si existen errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, se responde con status 400 y se muestran los errores encontrados
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Se extraen los datos necesarios del body de la petición
    const { nombre, email, password } = req.body;
    // Se llama al servicio encargado de registrar al usuario
    const user = await registerSrv(nombre, email, password);

    // Se responde con status 201 indicando que el usuario se registró correctamente
    res.status(201).json({
      message: "Usuario registrado",
      data: user,
    });
  } catch (error: any) {
    // En caso de error, se responde con status 400 y se envía el mensaje de error
    res.status(400).json({ error: error.message });
  }
};

// Controlador para iniciar sesión (login)
export const loginCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // Se valida la request para detectar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, se responde con status 400 y se muestran los errores
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Se extraen el email y password del body de la petición
    const { email, password } = req.body;
    // Se llama al servicio de login que verifica credenciales y genera un token JWT
    const { token } = await loginSrv(email, password);

    // Se devuelve el token en la respuesta
    res.json({ token });
  } catch (error: any) {
    // Si ocurre algún error (credenciales incorrectas, etc.), se responde con status 401 y el mensaje de error
    res.status(401).json({ error: error.message });
  }
};
