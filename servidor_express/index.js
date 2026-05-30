import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middleware de aplicación
app.use((req, res, next) => {
console.log(`Datos recibidos: ${req.method} ${req.url}`);
next(); // Pasa el control al siguiente middleware o ruta
});

//Archivos estáticos
app.use(express.static(join(__dirname, 'public')));


// Ruta JSON
app.get('/peliculas', (req, res) => {

    const peliculas = [
        {
            id: 1,
            title: "Streets of Fire",
            year: 1984,
            director: "Walter Hill",
            image: "/imagenes/streets-of-fire.jpg",
            video: "/videos/streets-of-fire.mp4"
        },
        {
            id: 2,
            title: "The Girl on a Motorcycle",
            year: 1968,
            director: "Jack Cardiff",
            image: "/imagenes/girl-on-motorcycle.jpg",
            video: "/videos/girl-on-motorcycle.mp4"
        }
    ];

    res.json(peliculas);

});

const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Servidor en http://localhost:${PORT}`);
});