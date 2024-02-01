const Donante = require('../models/modelsDonante');

const mongoose = require('mongoose');
const flash = require('connect-flash');

/*
/GET /HOMEPAGE
*/
exports.homepage = async (req, res) => {
  //console.log(req);
  const messages = await req.flash("info");
  console.log(); // Esto debería mostrar los mensajes en la consola
  const locals = {
    title: "SGBLM",
    description: "Free SGBLM User Management System",
    //messages: messages,
  }

  let perPagina = 12;  // Cambio realizado: perPage a perPagina
  let pagina = req.query.pagina || 1;

  try{
    const donantes = await Donante.aggregate([ { $sort:{ updateAt: -1} }])
      .skip(perPagina * pagina - perPagina)
      .limit(perPagina)
      .exec();

    const count = await Donante.countDocuments();
    res.render("index", { 
      locals, 
      donantes,
      current:pagina,
      paginas: Math.ceil(count / perPagina),
      messages
    });

    //const donantes = await Donante.find({}).limit(10);
    //res.render("index", { locals, messages, donantes });
  } catch (error){
    console.log(error);
  }

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

exports.postDonante = async (req, res) => {
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
    //req.flash('info', 'Nueva Donadora se ha agregado');
    req.flash('info', 'Nueva Donadora se ha agregado');
    //return res.render('index', { info: 'Nueva Donadora Agregada' });
    console.log('Mensajes flash antes de la redirección:', req.flash('info'));
    // Renderizar la vista 'index' con el mensaje flash
    return res.redirect('/');
  } catch (error) {
   console.error('Error al crear un nuevo Donante:', error);
   return res.redirect('/add');
  }
};


// /GET/
//Donante Datos
 //exports.view = async (req, res) => {

  //try{
    //const donante = await Donante.findOne( { _id: req.params.id})
    //const locals = {
      //title: "View Donante Dato",
      //description: "Free SGBLM User Management System",
    //};
    //res.render('donante/view',{
      //locals, 
      //donante
    //})
  //} catch(error){
    //console.log(error);
  //}
 //}
