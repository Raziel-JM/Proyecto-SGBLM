const Donante = require('../models/modelsDonante');

const mongoose = require('mongoose');


exports.homepage = async(req,res) => {
    
        const locals = {
          title: 'SGBLM',
          description: 'Free SGBLM User Management System'
        };
        res.render('index', locals);
}
//Get
//Nueva Donante Formulario
exports.addDonante = async(req,res) => {
    
  const locals = {
    title: 'Agregar Nueva Donante - SGBLM',
    description: 'SGBLM'
  };
  res.render('donante/add', locals);
}

/** 
//Post
//Crear nuevo Donante 
*/

exports.postDonante = async(req,res) => {
  console.log('Recibiendo solicitud POST para /add');
  console.log('Datos del formulario:', req.body);
  console.log(req.body);

  const newDonante = new Donante({
    tipo: req.body.tipo,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    edad: req.body.edad,
    direccion: req.body.direccion,
    ocupacion: req.body.ocupacion,
    partos: req.body.partos,
    cesareas: req.body.cesareas,
    apellidosRNLactante: req.body.apellidosRNLactante,
    sdg: req.body.sdg,
    fechaNacimRN: req.body.fechaNacimRN,
    complicacionesEmbarazo: req.body.complicacionesEmbarazo,
    transfusionesUltimos5Anos: req.body.transfusionesUltimos5Anos,
    tatuajesPiercingsAcupunturaUltimoAno: req.body.tatuajesPiercingsAcupunturaUltimoAno,
    tratamientoMedico: req.body.tratamientoMedico,
    pruebaRapidaSifilis: req.body.pruebaRapidaSifilis,
    pruebaRapidaVIH: req.body. pruebaRapidaVIH,
    pruebaRapidaHepatitisC: req.body.pruebaRapidaHepatitisC,
    observaciones: req.body.observaciones
  });


  try {
    console.log('Intentando crear un nuevo Donante');
    await Donante.create(newDonante);
    console.log('Nuevo Donante creado exitosamente');
    res.redirect('/');
  } catch (error) {
    console.error('Error al crear un nuevo Donante:', error);
    // Resto del código de manejo del error...
  }
};