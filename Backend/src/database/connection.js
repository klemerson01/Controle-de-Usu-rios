require('dotenv').config()
const Sequelize = require('sequelize')


const database = process.env.DATABASE;
const username = process.env.USERNAME1;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;
// const port = process.env.PORT;

const connection = new Sequelize(database, username, password,{
    host,
    dialect
    
})

module.exports = connection;