const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    enum: ['Sí', 'No']
  },
  tatuajesPiercingsAcupunturaUltimoAno: {
    type: String,
    enum: ['Sí', 'No']
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
  },
  updatedAt: {
    type: Date,
  }
});

module.exports = mongoose.model('Donante', modelsDonanteSchema);
