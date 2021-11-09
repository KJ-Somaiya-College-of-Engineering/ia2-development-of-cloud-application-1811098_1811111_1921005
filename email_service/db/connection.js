const config = require("../config");
const { Sequelize } = require("sequelize");

var db = new Sequelize(config.dbName, config.dbUserName, config.dbPassword, {
  host: config.dbHost,
  port: config.dbPort,
  dialect: "mysql",

  dialectOptions:
    config.env !== "dev"
      ? {
          ssl: "Amazon RDS",
        }
      : {},
  logging: false,
});

module.exports = db;
