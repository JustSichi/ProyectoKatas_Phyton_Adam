const express = require('express');
const { connect } = require('./utils/db');

// Importaciones , conexio y rutas

const movieRoutes = require('./routes/movie.routes');
const cinemaRoutes = require('./routes/cinema.routes');


connect();

const PORT = 3000;
const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use('/movies', movieRoutes);
server.use('/cinemas', cinemaRoutes);

// errores

server.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  return res.status(404).json(error.message);
});


server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
});

server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});