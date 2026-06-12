import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import filmsRoutes from './routes/films.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();


//Middleware global
app.use(cors());

// Configuración avanzada: Permitir dominios específicos 
const corsOptions = { 
// Dominios permitidos 
origin: ['https://example.com', 'https://anotherdomain.com'], 
// // Métodos HTTP permitidos 
methods: ['GET', 'POST', 'PUT', 'DELETE'], 
// Encabezados permitidos 
allowedHeaders: ['Content-Type', 'Authorization'], credentials: true // Permitir cookies o credenciales 
}; 

app.use(cors(corsOptions));

// Middleware de aplicación
app.use((req, res, next) => {
console.log(`Datos recibidos: ${req.method} ${req.url}`);
next(); // Pasa el control al siguiente middleware o ruta
});

app.use(express.json());

//Archivos estáticos
app.use(express.static(join(__dirname, 'public')));

app.use('/films', filmsRoutes);



app.use((req, res, next) => { 
    res.status(404).send('Recurso no encontrado o ruta inválida');
});


const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Servidor en http://localhost:${PORT}`);
});