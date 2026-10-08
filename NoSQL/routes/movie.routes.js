const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// 1. GET: Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: 'Error al obtener las películas', error: err });
  }
});

// 2. GET: Buscar película por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ message: 'No se encontró ninguna película con ese ID' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al buscar por ID', error: err });
  }
});

// 3. GET: Buscar por Título
router.get('/title/:title', async (req, res) => {
  const { title } = req.params;
  try {
    const movies = await Movie.find({ title: new RegExp(title, 'i') });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: 'Error al buscar por título', error: err });
  }
});

// 4. GET: Buscar por Género
router.get('/genre/:genre', async (req, res) => {
  const { genre } = req.params;
  try {
    const movies = await Movie.find({ genre: new RegExp(genre, 'i') });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: 'Error al buscar por género', error: err });
  }
});

// 5. GET: Buscar por Año 
router.get('/year/:year', async (req, res) => {
  const { year } = req.params;
  try {
    const movies = await Movie.find({ year: { $gte: Number(year) } });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: 'Error al buscar por año', error: err });
  }
});

// 6. POST: Crear una nueva película
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (err) {
    return res.status(400).json({ message: 'Error al crear la película', error: err });
  }
});

// 7. PUT: Modificar/Actualizar una película existente por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movieToUpdate = new Movie(req.body);
    movieToUpdate._id = id; // Mantenemos el mismo _id

    const updatedMovie = await Movie.findByIdAndUpdate(id, movieToUpdate, { new: true });
    if (updatedMovie) {
      return res.status(200).json(updatedMovie);
    } else {
      return res.status(404).json({ message: 'No se encontró la película para actualizar' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al actualizar la película', error: err });
  }
});

// 8. DELETE: Eliminar una película por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (deletedMovie) {
      return res.status(200).json({ message: 'Película eliminada correctamente', movie: deletedMovie });
    } else {
      return res.status(404).json({ message: 'No se encontró la película a eliminar' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al eliminar la película', error: err });
  }
});

module.exports = router;