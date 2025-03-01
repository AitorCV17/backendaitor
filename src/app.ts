import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./routes";

const PORT = process.env.PORT || 3010;
const app = express();

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());
// Middleware para habilitar CORS y permitir solicitudes desde otros orígenes
app.use(cors());

// Registra el enrutador principal que agrupa todas las rutas de la aplicación
app.use(router);

// Inicia el servidor en el puerto definido y muestra un mensaje en la consola
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
