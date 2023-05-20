const Sequelize = require('sequelize');
const Studio = require('./Studio');
const db = require('./db');

const Instruments = db.define('instruments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, { underscored: true });

Instruments.belongsTo(Studio, {
    foreignKey: {
        name: 'studio_id',
        allowNull: false,
        underscored: true
    }
})
Studio.hasMany(Instruments);

Instruments.sync({ alter: false });

module.exports = Instruments;