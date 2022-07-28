import Sequelize from "sequelize";
const sequelize = require("../util/database");

export type appointmentType = {
  id: number;
  dateTime: string;
  testPatients: Array<number>;
};

const Appointment = sequelize.define("appointment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dateTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  testPatients: {
    type: Sequelize.JSON,
    allowNull: false,
  },
});

module.exports = Appointment;
