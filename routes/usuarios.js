const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { pool } = require('../config/postgress');
    
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.get('/usuarios', async (req, res) => {
  try {
  const response = await pool.query('SELECT * FROM users');
  res.status.apply(200).json(response.rows);} catch (e) {
  console.error('Error:', e)
  res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
  });

  router.post('/usuarios', async (req, res) => {
    try {
     await pool.query('INSERT INTO users (name, lastname, email) VALUES ($1, $2, $3)', [name, lastname, email]);

    res.status(200).json({ message: 'Usuario agregado correctamente' });
    } catch (e) {
    console.error('Error:', e)
    res.status(500).json({ message: 'Error al crear el usuario' });
    }
    });
    // put para actualizar
    router.put('/usuarios/:id', async (req, res) => {
      try {
      const id = req.params.id;
      const { name,  } = req.body;
      await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name,  id]);
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
      } catch (e) {
      console.error('Error:', e)
      res.status(500).json({ message: 'Error al actualizar el usuario' });
      }
      });
      // delete para eliminar
      router.delete('/usuarios/:id', async (req, res) => {
        try {
        const id = req.params.id;
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (e) {
        console.error('Error:', e)
        res.status(500).json({ message: 'Error al eliminar el usuario' });
        }
        });
module.exports = router;