import express from 'express'; 

const router = express.Router();

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

// GET /peliculas
router.get('/', (req, res) => {
    res.json(peliculas);
});

// GET /peliculas/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const pelicula = peliculas.find(pelicula => pelicula.id === id);

    if (!pelicula) {
        return res.status(404).json({
            error: 'Película no encontrada'
        });
    }

    res.json(pelicula);
});

export default router;