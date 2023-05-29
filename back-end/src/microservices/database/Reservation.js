const Sequelize = require('sequelize');
const db = require('../database/db');
const StudioSchedule = require('./StudioSchedule');
const User = require('./User');

const Reservation = db.define('reservation', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, { underscored: true });

Reservation.belongsTo(StudioSchedule, {
  foreignKey: {
    name: 'studio_schedule_id',
    allowNull: false,
    underscored: true
  }
});

Reservation.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
    underscored: true
  }
});

Reservation.sync({ alter: false })

module.exports = Reservation;
