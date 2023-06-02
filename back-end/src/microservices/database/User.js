const Sequelize = require('sequelize')
const db = require('./db');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING, 
        allowNull: true 
    }
}, { underscored: true })

User.sync({ alter: false });

module.exports = User;