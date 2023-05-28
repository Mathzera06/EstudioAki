const Sequelize = require('sequelize');
const db = require('../database/db');
const StudioSchedule = require ('./StudioSchedule')

const Reservation = db.define('reservation', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  studio_schedule_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Reservation.belongsTo(StudioSchedule, {
    foreingKey: {
        name:'studio_schedule_id',
        allowNull: false,
        underscored: true
    }
})

Reservation.sync({alter: false})

module.exports = Reservation;
