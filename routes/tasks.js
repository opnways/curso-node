const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const db = new sqlite3.Database('./database.db');

router.get('/create-database', (req, res) => {
    // Crear la conexión a la base de datos
    const db = new sqlite3.Database('databases.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Conexión exitosa a la base de datos');
    });
    // Crear la tabla
    db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)', [], (err) => {
      if (err) {
         return res.status(500).send(err.message);
      }
      console.log('Tabla creada');
    });
    // Cerrar la conexión cuando se termine de utilizar
    db.close((err) => {
      if (err) {
         return res.status(500).send(err.message);
      }
      console.log('Conexión cerrada');
    });
    res.send('Base de datos creada');
  });

// mostrar la lista de tareas
router.get('/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], function(err, rows) {
      if (err) {
        return res.status(500).send('Error interno del servidor');
      }
      res.status(200).send(rows);
    });
  });
  
  // agregar una nueva tarea
  router.post('/tasks', (req, res) => {
    const task = req.body.task;
    db.run(`INSERT INTO tasks (task) VALUES (?)`, [task], function(err) {
      if (err) {
        return res.status(500).send('Error interno del servidor');
      }
      res.send(`La tarea "${task}" ha sido agregada.`);
    });
  });

  // buscar una tarea por id
  router.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send('El parámetro id es requerido');
    }
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Error interno del servidor');
      }
      if (!row) {
        return res.status(404).send('Tarea no encontrada');
      }
      res.send(row);
    });
  });

  // actualizar una tarea por id
  router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = req.body.task;
    if(!id || !task){
        return res.status(400).send('Los parámetros id y task son requeridos');
    }
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error interno del servidor');
        }
        if (!row) {
            return res.status(404).send('Tarea no encontrada');
        }
    });
    db.get('UPDATE tasks SET task = ? WHERE id = ?', [task, id], (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Error al actualizar');
      }

      res.status(200).send(`Tarea con id ${id} actualizada con éxito`);
    });
 

  // eliminar una tarea por id
    router.delete('/tasks/:id', (req, res) => {
        const { id } = req.params;
        if(!id){
            return res.status(400).send('El parámetro id es requerido');
        }
        db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error interno del servidor');
            }
            if (!row) {
                return res.status(404).send('Tarea no encontrada');
            }
        });
        db.get('DELETE FROM tasks WHERE id = ?', [id], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error al eliminar');
            }
            res.status(200).send(`Tarea con id ${id} eliminada con éxito`);
        });
    });

    // eliminar todas las tareas
    router.delete('/tasks', (req, res) => {
        db.get('DELETE FROM tasks', (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error al eliminar');
            }
            res.status(200).send(`Todas las tareas eliminadas con éxito`);
        });
    });

});

module.exports = router;
