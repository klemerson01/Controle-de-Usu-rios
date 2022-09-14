const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
// const sq = new Sequelize('mysql::memory');
const sq = require("../src/database/connection");

var User = sq.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: DataTypes.TEXT,
  password: { type: DataTypes.TEXT },
});



module.exports = User;
