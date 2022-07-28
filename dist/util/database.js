"use strict";
const SequelizeDB = require("sequelize");
const sequelize = new SequelizeDB("node-diagnostics", "node", "Node@123", {
    dialect: "mysql",
    host: "localhost",
});
module.exports = sequelize;
