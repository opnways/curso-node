const Sequelize = require('sequelize');
// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('nombre_de_tu_base_de_datos', 'postgres', '1234', {
host: 'localhost',
dialect: 'postgres' // El dialecto dependerá del tipo de base de datos que estés utilizando
});

module.exports = sequelize;
