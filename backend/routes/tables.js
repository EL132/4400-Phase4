// routes/airline.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/airline_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM airline');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching airline table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/airplane_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM airplane');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching airplane table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/airport_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM airport');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching airport table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/flight_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM flight');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching flight table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/leg_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM leg');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching leg table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/location_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM location');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching location table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/passenger_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM passenger');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching passenger table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/passenger_vacations_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM passenger_vacations');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching passenger_vacations table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/person_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM person');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching person table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/pilot_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM pilot');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching pilot table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/pilot_licenses_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM pilot_licenses');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching pilot_licenses table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/route_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM route');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching route table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/route_path_table', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM route_path');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching route_path table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;