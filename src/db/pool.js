const { Pool } = require('pg');
require('dotenv').config();
/*
console.log("host: " + process.env.DATABASE_HOST)
console.log("database name: " + process.env.DATABASE_NAME)
console.log("user: " + process.env.DATABASE_USER)
console.log("password: " + process.env.DATABASE_PASSWORD)
console.log("port: " + process.env.DATABASE_PORT)
*/
module.exports = new Pool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
})