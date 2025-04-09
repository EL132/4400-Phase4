const express = require('express');
const router = express.Router();
const db = require('../db'); 

// 1
router.post('/add_airplane', async (req, res) => {
    const {
        ip_airlineID,
        ip_tail_num,
        ip_seat_capacity,
        ip_speed,
        ip_locationID,
        ip_plane_type,
        ip_maintenanced,
        ip_model,
        ip_neo
    } = req.body;

    try {
        // Call the stored procedure with parameters
        const [result] = await db.query(
        `CALL add_airplane(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            ip_airlineID,
            ip_tail_num,
            ip_seat_capacity,
            ip_speed,
            ip_locationID,
            ip_plane_type,
            ip_maintenanced,
            ip_model,
            ip_neo
        ]
        );
        res.json({ message: 'add_airplane() called successfully.', result });
    } catch (error) {
        console.error('Error in add_airplane:', error);
        res.status(500).json({ error: 'Failed to add airplane', details: error.message });
    }
});

// 2
router.post('/add_airport', async (req, res) => {
    const {
        ip_airportID,
        ip_airport_name,
        ip_city,
        ip_state,
        ip_country,
        ip_locationID
    } = req.body;

    try {
        const [result] = await db.query(
            `CALL add_airport(?, ?, ?, ?, ?, ?)`,
            [
                ip_airportID,
                ip_airport_name,
                ip_city,
                ip_state,
                ip_country,
                ip_locationID
            ]
        );
        // currently, we are not checking if the airport was actually added, only that the function
        // didn't return any error
        res.json({ message: 'add_airport() called successfully.', result });
    } catch (error) {
        console.error('Error in add_airport:', error);
        res.status(500).json({ error: 'Failed to add airport', details: error.message });
    }
});

// 3
router.post('/add_person', async (req, res) => {
    const {
        ip_personID,
        ip_first_name,
        ip_last_name,
        ip_locationID,
        ip_taxID,
        ip_experience,
        ip_miles,
        ip_funds
    } = req.body;

    try {
        const [result] = await db.query(
            `CALL add_person(?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                ip_personID,
                ip_first_name,
                ip_last_name,
                ip_locationID,
                ip_taxID,
                ip_experience,
                ip_miles,
                ip_funds
            ]
        );
        res.json({ message: 'add_person() called successfully..', result });
    } catch (error) {
        console.error('Error in add_person:', error);
        res.status(500).json({ error: 'Failed to add person', details: error.message });
    }
});

// 4
router.post('/grant_or_revoke_pilot_license', async (req, res) => {
    const { ip_personID, ip_license } = req.body;

    try {
        const [result] = await db.query(
            `CALL grant_or_revoke_pilot_license(?, ?)`,
            [ip_personID, ip_license]
        );
        res.json({ message: 'grant_or_revoke_pilot_license() called successfully..', result });
    } catch (error) {
        console.error('Error in grant_or_revoke_pilot_license:', error);
        res.status(500).json({ error: 'Failed to call grant_or_revoke_pilot_license', details: error.message });
    }
});

// 5
router.post('/offer_flight', async (req, res) => {
    const {
        ip_flightID,
        ip_routeID,
        ip_support_airline,
        ip_support_tail,
        ip_progress,
        ip_next_time,
        ip_cost
    } = req.body;

    try {
        const [result] = await db.query(
            `CALL offer_flight(?, ?, ?, ?, ?, ?, ?)`,
            [
                ip_flightID,
                ip_routeID,
                ip_support_airline,
                ip_support_tail,
                ip_progress,
                ip_next_time,
                ip_cost
            ]
        );
        res.json({ message: 'offer_flight() called successfully..', result });
    } catch (error) {
        console.error('Error in offer_flight:', error);
        res.status(500).json({ error: 'Failed to call offer_flight', details: error.message });
    }
});

// 6
router.post('/flight_landing', async (req, res) => {
    const { ip_flightID } = req.body;

    try {
        const [result] = await db.query(
            `CALL flight_landing(?)`,
            [ip_flightID]
        );
        res.json({ message: 'flight_landing() called successfully..', result });
    } catch (error) {
        console.error('Error in flight_landing:', error);
        res.status(500).json({ error: 'Failed to call flight_landing', details: error.message });
    }
});

// 7
router.post('/flight_takeoff', async (req, res) => {
    const { ip_flightID } = req.body;

    try {
        const [result] = await db.query(
            `CALL flight_takeoff(?)`,
            [ip_flightID]
        );
        res.json({ message: 'flight_takeoff() called successfully..', result });
    } catch (error) {
        console.error('Error in flight_takeoff:', error);
        res.status(500).json({ error: 'Failed to call flight_takeoff', details: error.message });
    }
});

// 8
router.post('/passengers_board', async (req, res) => {
    const { ip_flightID } = req.body;

    try {
        const [result] = await db.query(
            `CALL passengers_board(?)`,
            [ip_flightID]
        );
        res.json({ message: 'passengers_board() called successfully..', result });
    } catch (error) {
        console.error('Error in passengers_board:', error);
        res.status(500).json({ error: 'Failed to call passengers_board', details: error.message });
    }
});

// 9
router.post('/passengers_disembark', async (req, res) => {
    const { ip_flightID } = req.body;
    try {
        const [result] = await db.query(
            `CALL passengers_disembark(?)`,
            [ip_flightID]
        );
        res.json({ message: 'passengers_disembark() called successfully..', result });
    } catch (error) {
        console.error('Error in passengers_disembark:', error);
        res.status(500).json({ error: 'Failed to call passengers_disembark', details: error.message });
    }
});

// 10
router.post('/assign_pilot', async (req, res) => {
    const { ip_flightID, ip_personID } = req.body;
    try {
        const [result] = await db.query(
            `CALL assign_pilot(?, ?)`,
            [ip_flightID, ip_personID]
        );
        res.json({ message: 'assign_pilot() called successfully..', result });
    } catch (error) {
        console.error('Error in assign_pilot:', error);
        res.status(500).json({ error: 'Failed to call assign_pilot', details: error.message });
    }
});

// 11
router.post('/recycle_crew', async (req, res) => {
    const { ip_flightID } = req.body;
    try {
        const [result] = await db.query(
            `CALL recycle_crew(?)`,
            [ip_flightID]
        );
        res.json({ message: 'recycle_crew() called successfully..', result });
    } catch (error) {
        console.error('Error in recycle_crew:', error);
        res.status(500).json({ error: 'Failed to call recycle_crew', details: error.message });
    }
});

// 12
router.post('/retire_flight', async (req, res) => {
    const { ip_flightID } = req.body;
    try {
        const [result] = await db.query(
            `CALL retire_flight(?)`,
            [ip_flightID]
        );
        res.json({ message: 'retire_flight() called successfully..', result });
    } catch (error) {
        console.error('Error in retire_flight:', error);
        res.status(500).json({ error: 'Failed to call retire_flight', details: error.message });
    }
});

// 13
router.post('/simulation_cycle', async (req, res) => {
    try {
        const [result] = await db.query(`CALL simulation_cycle()`);
        res.json({ message: 'simulation_cycle() called successfully..', result });
    } catch (error) {
        console.error('Error in simulation_cycle:', error);
        res.status(500).json({ error: 'Failed to call simulation_cycle', details: error.message });
    }
});


module.exports = router;