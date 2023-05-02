const express = require('express');
const router = express.Router();

// Definir la ruta para el verbo GET
router.get('/', (req, res) => {
  res.send('¡Hola desde el servidor de Node.js!');
});
const usuariosRouter = require('./usuarios');
router.use(usuariosRouter);

const tasksRouter = require('./tasks');
router.use(tasksRouter);

module.exports = router;