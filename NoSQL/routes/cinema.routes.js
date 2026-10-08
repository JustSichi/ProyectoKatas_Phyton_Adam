const express = require('express');
const Cinema = require('../models/Cinema');

const router = express.Router();

// 1. GET: Obtener todos los cines
router.get('/', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
  } catch (err) {
    return res.status(500).json({ message: 'Error al obtener los cines', error: err });
  }
});

// 2. POST: Crear un nuevo cine
router.post('/', async (req, res) => {
  try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (err) {
    return res.status(400).json({ message: 'Error al crear el cine', error: err });
  }
});

// 3. PUT: Modificar datos de un cine existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cinemaToUpdate = new Cinema(req.body);
    cinemaToUpdate._id = id;

    const updatedCinema = await Cinema.findByIdAndUpdate(id, cinemaToUpdate, { new: true });
    if (updatedCinema) {
      return res.status(200).json(updatedCinema);
    } else {
      return res.status(404).json({ message: 'No se encontró el cine' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al actualizar el cine', error: err });
  }
});

// 4. PUT: Añadir una película al array de películas de un cine
router.put('/:id/movies', async (req, res) => {
  const { id } = req.params;
  const { movieId } = req.body;
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(
      id,
      { $push: { movies: movieId } },
      { new: true }
    ).populate('movies');

    if (updatedCinema) {
      return res.status(200).json(updatedCinema);
    } else {
      return res.status(404).json({ message: 'No se encontró el cine' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al añadir la película al cine', error: err });
  }
});

// 5. DELETE: Eliminar un cine
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCinema = await Cinema.findByIdAndDelete(id);
    if (deletedCinema) {
      return res.status(200).json({ message: 'Cine eliminado correctamente', cinema: deletedCinema });
    } else {
      return res.status(404).json({ message: 'No se encontró el cine a eliminar' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al eliminar el cine', error: err });
  }
});

module.exports = router;