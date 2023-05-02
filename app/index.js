const express = require("express");
const http = require('http');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

const sequelize = require('./config/sequelize');
const User = require('./models/user');
sequelize.sync()
  .then(() => {
    console.log('Database synced!');
  });

// crear una ruta para el verbo GET
app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor de Node.js!');
});

// cargar las rutas
// cargar las rutas con la inicial /api
const routes = require('./routes/index');
app.use('/api', routes);


app.listen(port,() => {
  console.log('Servidor iniciado en el puerto ' + port);
});