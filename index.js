const express = require("express");
const http = require('http');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);


app.use('/api', require('./routes/index'));

server.listen(port,() => {
  console.log('Servidor iniciado en el puerto ' + port);
});