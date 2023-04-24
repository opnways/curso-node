const express = require('express')
const app = express()
const bienvenida = { 
  
  mensaje: "Hola Mundo"}

app.get('/', (req, res) => {
  res.status(200).json(bienvenida)

})

module.exports = app