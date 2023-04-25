const express = require('express');
const router = express.Router();

const usuarios = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'Pedro' },
  { id: 3, nombre: 'Pablo' }];
router.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

module.exports = router;