const express = require("express");
const http = require('http');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
host: 'localhost',database: 'nombre_de_tu_base_de_datos',
password: '1234',
port: 5432,
});

pool.query('SELECT * FROM fichajes', (err, result) => {
  if (err) {
  console.error(err);
  return;
  }
  console.log(result.rows);
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