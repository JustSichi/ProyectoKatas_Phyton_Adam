const mongoose = require('mongoose');

const urlDb = 'mongodb://127.0.0.1:27017/proyecto-basico-express-movies';

const connect = async () => {
  try {
    await mongoose.connect(urlDb);
    console.log('Conectado con éxito a la base de datos MongoDB');
  } catch (error) {
    console.log('Error al conectar con la base de datos:', error);
  }
};

module.exports = { connect };