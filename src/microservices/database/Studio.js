const Sequelize = require('sequelize');
const User = require('../database/User');
const db = require('./db');

const Studio = db.define('studios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
        allowNull: true
    },
    complement: {
        type: Sequelize.STRING,
        allowNull: true
    },
    neighbourhood: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zip_code: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { underscored: true });

Studio.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
});
User.hasMany(Studio);

Studio.sync({ alter: true });

module.exports = Studio;