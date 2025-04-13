const express = require('express');
const router = express.Router();
const db = require('../db'); 

// 1
router.get('/flights_in_the_air', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM flights_in_the_air`);
        res.json({ message: 'flights_in_the_air view retrieved successfully.', data: rows });
    } catch (error) {
        console.error('Error fetching flights_in_the_air view:', error);
        res.status(500).json({ error: 'Failed to fetch flights_in_the_air view', details: error.message });
    }
});

// 2
router.get('/flights_on_the_ground', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM flights_on_the_ground`);
        res.json({ message: 'flights_on_the_ground view retrieved successfully.', data: rows });
    } catch (error) {
        console.error('Error fetching flights_on_the_ground view:', error);
        res.status(500).json({ error: 'Failed to fetch flights_on_the_ground view', details: error.message });
    }
});

// 3
router.get('/people_in_the_air', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM people_in_the_air`);
        res.json({ message: 'people_in_the_air view retrieved successfully.', data: rows });
    } catch (error) {
        console.error('Error fetching people_in_the_air view:', error);
        res.status(500).json({ error: 'Failed to fetch people_in_the_air view', details: error.message });
    }
});


// 4
router.get('/people_on_the_ground', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM people_on_the_ground`);
        res.json({ message: 'people_on_the_ground view retrieved successfully.', data: rows });
    } catch (error) {
        console.error('Error fetching people_on_the_ground view:', error);
        res.status(500).json({ error: 'Failed to fetch people_on_the_ground view', details: error.message });
    }
});

// 5
router.get('/route_summary', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM route_summary`);
        res.json({ message: 'route_summary view retrieved successfully.', data: rows });
    } catch (error) {
        console.error('Error fetching route_summary view:', error);
        res.status(500).json({ error: 'Failed to fetch route_summary view', details: error.message });
    }
});

// 6
router.get('/alternative_airports', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM alternative_airports`);
        res.json({ message: 'alternative_airports view retrieved successfully.', data: rows });
    } catch (error) {
        console.error('Error fetching alternative_airports view:', error);
        res.status(500).json({ error: 'Failed to fetch alternative_airports view', details: error.message });
    }
});



module.exports = router;