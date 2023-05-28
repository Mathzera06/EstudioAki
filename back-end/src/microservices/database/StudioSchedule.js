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
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 23
        }
    },
    hour_to: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 23
        }
    },
}, { underscored: true });

StudioSchedule.belongsTo(Studio, {
    foreignKey: {
        name: 'studio_id',
        allowNull: false,
        underscored: true
    }
});
Studio.hasMany(StudioSchedule);

StudioSchedule.sync({ alter: false });

module.exports = StudioSchedule;