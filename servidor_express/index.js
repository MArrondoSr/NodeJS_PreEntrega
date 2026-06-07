import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import filmsRoutes from './routes/films.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// const peliculas = [
//         {
//             id: 1,
//             title: "Streets of Fire",
//             year: 1984,
//             director: "Walter Hill",
//             image: "/imagenes/streets-of-fire.jpg",
//             video: "/videos/streets-of-fire.mp4"
//         },
//         {
//             id: 2,
//             title: "The Girl on a Motorcycle",
//             year: 1968,
//             director: "Jack Cardiff",
//             image: "/imagenes/girl-on-motorcycle.jpg",
//             video: "/videos/girl-on-motorcycle.mp4"
//         }
//     ];


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


//Archivos estáticos
app.use(express.static(join(__dirname, 'public')));

app.use('/peliculas', filmsRoutes);


//path params

// app.get('/peliculas/:id', (req, res) => {

//     const id = parseInt(req.params.id);

//     const pelicula = peliculas.find(
//         pelicula => pelicula.id === id
//     );

//     if (!pelicula) {
//         return res.status(404).json({
//             error: 'Película no encontrada'
//         });
//     }

//     res.json(pelicula);
// });

// //query params
// app.get('/buscar', (req, res) => {

//     const { year } = req.query;

//     const resultado = peliculas.filter(
//         pelicula => pelicula.year === parseInt(year)
//     );

//     res.json(resultado);

// });

// // Ruta JSON
// app.get('/peliculas', (req, res) => {
//     res.json(peliculas);

// });

// Middleware para manejar errores 404 
app.use((req, res, next) => { 
    res.status(404).send('Recurso no encontrado o ruta inválida');
});


const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Servidor en http://localhost:${PORT}`);
});