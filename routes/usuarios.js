const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const usuarios = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'Pedro' },
  { id: 3, nombre: 'Pablo' }];
router.get('/usuarios', (req, res) => {
  
  res.status(200).json(usuarios);
});

router.post('/usuarios', (req, res) => {
  console.log(req.body);
  const id = usuarios.length + 1;
  const usuario = req.body;
  usuarios.push({ ...usuario, id });
  mensaje = { statusCode: 201, message: 'Usuario creado con éxito', usuarioCreado: { ...usuario, id } };

  res.status(201); // Código de creado un nuevo recurso
  res.type('application/json'); // Tipo de contenido JSON
  res.send(mensaje);

});
router.get('/busqueda', (req, res) => {
  const q = req.query.q;
  const order = req.query.order;
  const usuarios = [
    { id: 1, nombre: 'Juan Francisco' },
    { id: 2, nombre: 'Pedro' },
    { id: 3, nombre: 'Pablo' },
    { id: 4, nombre: 'Juan Antonio' },];
  // si la palabra contiene juan devolverá los usuarios con ese nombre en orden ascendente
  const resultado = usuarios.filter(usuario => usuario.nombre.includes(q));
  if(order === 'asc'){
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  res.status(200).json(resultado);

  // aquí puedes utilizar los valores recibidos en los query params para hacer una búsqueda o alguna otra acción
});







module.exports = router;