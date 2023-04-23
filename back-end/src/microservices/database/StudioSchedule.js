const Sequelize = require('sequelize');
const Studio = require('./Studio');
const db = require('./db');

const StudioSchedule = db.define('studio_schedules', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    hour_from: {
        type: Sequelize.TIME,
        allowNull: false
    },
    hour_to: {
        type: Sequelize.TIME,
        allowNull: false
    },
}, { underscored: true });

StudioSchedule.belongsTo(Studio, {
    foreignKey: {
        allowNull: false
    }
});
Studio.hasMany(StudioSchedule);

StudioSchedule.sync({ alter: true });

module.exports = StudioSchedule;