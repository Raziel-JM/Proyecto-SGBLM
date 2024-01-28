require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connecDB = require('./server/config/db')

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///Conectar DB
connecDB();

// Archivos estáticos
app.use(express.static('public'));

// Motor de plantillas
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/',require('./server/routes/customer'))

// Handle 404
app.get('*',(req, res) => {
  res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`El servidor está ejecutándose en el puerto ${port}`);
});
