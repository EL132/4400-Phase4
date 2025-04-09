// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'temp', // these credentials are specific to each person, but it should b simple
    password: 'oopsie i ', // same as note above 
    database: 'flight_tracking',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
