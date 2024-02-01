// Importar la biblioteca mongoose
const mongoose = require('mongoose');

// Crear un esquema usando mongoose.Schema
const Schema = mongoose.Schema;

// Definir el esquema del modelo 'Donante'
const modelsDonanteSchema = new Schema({
  tipo: {
    type: String,
    enum: ['Homóloga', 'Heteróloga'],
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  ocupacion: {
    type: String
  },
  partos: {
    type: Number
  },
  cesareas: {
    type: Number
  },
  apellidosRNLactante: {
    type: String
  },
  sdg: {
    type: Number
  },
  fechaNacimRN: {
    type: Date,
    required: true
  },
  complicacionesEmbarazo: {
    type: String
  },
  transfusionesUltimos5Anos: {
    type: String,
    enum: ['Sí', 'No'],
    required: true
  },
  tatuajesPiercingsAcupunturaUltimoAno: {
    type: String,
    enum: ['Sí', 'No'],
    required: true
  },
  tratamientoMedico: {
    type: String
  },
  pruebaRapidaSifilis: {
    type: String,
    enum: ['No Reactivo', 'Reactivo'],
    required: true
  },
  pruebaRapidaVIH: {
    type: String,
    enum: ['No Reactivo', 'Reactivo'],
    required: true
  },
  pruebaRapidaHepatitisC: {
    type: String,
    enum: ['No Reactivo', 'Reactivo'],
    required: true
  },
  observaciones: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Agregar la función count() fuera del esquema
modelsDonanteSchema.methods.count = function() {
  return this.model('Donante').countDocuments();
};

// Exportar el modelo 'Donante' basado en el esquema
module.exports = mongoose.model('Donante', modelsDonanteSchema);
