const app = require('./server');
const http = require('http');
require('dotenv').config();

const server = http.createServer(app);
const dbUser = process.env.DB_USER;
console.log(dbUser);

const port = process.env.PORT || 3000;
server.listen(port,() => {
  console.log('Servidor iniciado en el puerto ' + port);
});