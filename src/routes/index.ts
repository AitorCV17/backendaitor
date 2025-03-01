import { Router } from "express";
import { readdirSync } from "fs";

// Define la ruta del directorio actual
const PATH_ROUTER = `${__dirname}`;
const router = Router();

// Función para limpiar el nombre del archivo (quita la extensión)
const cleanFileName = (fileName: string) => fileName.split(".").shift()!;

// Recorre todos los archivos del directorio actual
readdirSync(PATH_ROUTER).forEach((filename) => {
  // Obtiene el nombre limpio del archivo
  const cleanName = cleanFileName(filename);
  // Evita importar este archivo (index)
  if (cleanName !== "index") {
    // Importa dinámicamente el módulo y añade su router
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

// Exporta el router principal que agrupa todas las rutas
export { router };
