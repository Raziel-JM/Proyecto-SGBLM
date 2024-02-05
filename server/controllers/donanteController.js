const Donante = require('../models/modelsDonante');

const mongoose = require('mongoose');
const flash = require('connect-flash');
const moment = require('moment');
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

  let perPagina = 20;  // Cambio realizado: perPage a perPagina
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
}



// /GET/
// Donante Datos
exports.view = async (req, res) => {
  try {
    const donante = await Donante.findOne({ _id: req.params.id });
    if (!donante) {
      return res.status(404).render('404'); // Mostrar página 404 si el donante no se encuentra
    }
    // Formatea la fecha en formato UTC
    const fechaUTC = moment.utc(donante.fechaNacimRN).format('ddd, DD MMM YYYY HH:mm:ss [GMT]');

    // Traduce la fecha al español
    moment.locale('es');
    const fechaTraducida = moment(donante.fechaNacimRN).format('ddd, DD [de] MMMM [de] YYYY');

    const locals = {
      title: "Vista Registro Donadoras",
      description: "Free SGBLM User Management System",
      donante,
      moment
    };
    res.render('donante/view', locals);
  } catch (error) {
    console.log('Error en el controlador de vista:', error);
    res.status(500).render('error', { message: 'Error al cargar los detalles del donante' });
  }
}

// /GET/
// Editar Donante Datos
exports.edit = async (req, res) => {
  try {
    const donante = await Donante.findOne({ _id: req.params.id });
    if (!donante) {
      return res.status(404).render('404'); // Mostrar página 404 si el donante no se encuentra
    }
     // Formatea la fecha de nacimiento en formato dd/mm/aaaa
     const formattedFechaNacimRN = moment(donante.fechaNacimRN).format('DD/MM/YYYY');

    const locals = {
      title: "Editar Registro Donadoras",
      description: "Free SGBLM User Management System",
      donante: { ...donante._doc, formattedFechaNacimRN }, // Agrega la fecha formateada al objeto donante
      moment
    };
    res.render('donante/edit', locals);
  } catch (error) {
    console.log('Error en el controlador de vista:', error);
    res.status(500).render('error', { message: 'Error al cargar los detalles del donante' });
  }
}

// /GET/
// Actulizar Donante Datos
exports.editPost = async (req, res) => {
  try {
    await Donante.findByIdAndUpdate(req.params.id , {
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
    observaciones: req.body.observaciones,
    updatedAt: Date.now(),
    });
    //await res.redirect(`/edit/${req.params.id}`);
    res.redirect(`/edit/${req.params.id}`);
    //res.render('donante/edit', locals);
    console.log("redirected");
  } catch (error) {
    console.log('Error en el controlador de vista:', error);
    res.status(500).render('error', { message: 'Error al cargar los detalles del donante' });
  }
}


//Delete//
//Eliminar Donante Datos

exports.deleteDonante = async (req, res) => {  
  try {    
    // Elimina el donante usando el modelo Donante y el id proporcionado en los parámetros de la URL    
    await Donante.deleteOne({ _id: req.params.id });
        // Redirecciona a la página principal u otra página según sea necesario    
        res.redirect("/");  
      } catch (error) {    
        //Maneja el error de alguna manera, aquí solo se imprime en la consola    
        console.log(error);   
        
        // Puedes enviar una respuesta de error o redirigir a una página de error si es necesario    
        res.status(500).send("Error al eliminar el donante" + error.message);  
      }
    }

    /**
 * POST /search
 * Search Donante Data
 */
exports.searchDonantes = async (req, res) => {
  const locals = {
    title: "Search Donante Data",
    description: "Free SGBLM User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const donantes = await Donante.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        // Agrega aquí otros campos en los que quieras realizar la búsqueda
      ],
    });

    res.render("search", {
      donantes,
      locals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { message: 'Error en la búsqueda de donantes' });
  }
};