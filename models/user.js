const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');
const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});
// exportar el modelo User
module.exports = User;
 
