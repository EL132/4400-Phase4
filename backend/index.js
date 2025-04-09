// index.js
const express = require('express');
const tableRoutes = require('./routes/tables');
const viewRoutes = require('./routes/views');
const procedureRoutes = require('./routes/procedures');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/tables', tableRoutes);
app.use('/procedures', procedureRoutes);
app.use('/views', viewRoutes);

// Test DB connection before starting server
async function startServer() {
    try {
        const connection = await db.getConnection();
        await connection.ping();
        console.log('✅ Successfully connected to MySQL database');
        connection.release();

        app.listen(PORT, () => {
            console.log('Server running at http://localhost:3000')
            });
    } catch (error) {
        console.error('Failed to connect to MySQL database:', error.message);
        process.exit(1); // Exit process if DB connection fails
    }
}

startServer();