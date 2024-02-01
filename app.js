require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const connecDB = require('./server/config/db')


const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///Conectar DB
connecDB();

// Archivos estáticos
app.use(express.static('public'));

// Configurar la sesión
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
    },
  })
);

// Configurar Flash Messages
app.use(flash({sessionKeyName : 'falshMessage'}));
// Middleware para variables globales
app.use((req, res, next) => {
  app.locals.messages = req.flash('messages');
  next();
});

// Motor de plantillas
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/',require('./server/routes/donante'))

// Handle 404
app.get('*',(req, res) => {
  res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`El servidor está ejecutándose en el puerto ${port}`);
});
