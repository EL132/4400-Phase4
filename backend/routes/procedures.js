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
        
        const [checkResult] = await db.query(
            `SELECT * FROM airplane WHERE tail_num = ?`,
            [ip_tail_num]
        );
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Airplane not found after addition' });
        }
        res.json({ message: 'add_airplane() called successfully.', result, checkResult });
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
        
        const [checkResult] = await db.query(
            `SELECT * FROM airport WHERE airportID = ?`,
            [ip_airportID]
        );
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Airport not found after addition' });
        }

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
        console.log(result);
        
        const [checkResult] = await db.query(
            `SELECT * FROM person WHERE personID = ?`,
            [ip_personID]
        );

        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Person not found after addition' });
        }

        if (ip_miles == null || ip_funds == null) {
            const [checkResult2] = await db.query( 
                `SELECT * FROM pilot WHERE personID = ?`,
                [ip_personID]
            );
            if (checkResult2.length === 0) {
                return res.status(404).json({ error: 'Pilot not found after addition' });
            }
        }
        if (ip_taxID == null || ip_experience == null) {
            const [checkResult3] = await db.query(
                `SELECT * FROM passenger WHERE personID = ?`,
                [ip_personID]
            );
            if (checkResult3.length === 0) {
                return res.status(404).json({ error: 'Passenger not found after addition' });
            }
        }
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
        const [before] = await db.query(
            `SELECT * FROM pilot_licenses WHERE personID = ? and license = ?`,
            [ip_personID, ip_license]
        ); 
        // Make an empty variable called exists
        const exists = before.length > 0;

        if (before.length === 0) {
            
        }
        const [result] = await db.query(
            `CALL grant_or_revoke_pilot_license(?, ?)`,
            [ip_personID, ip_license]
        );

        const [after] = await db.query(
            `SELECT * FROM pilot_licenses WHERE personID = ? and license = ?`,
            [ip_personID, ip_license]
        );
        if (after.length !== 0 && exists) {
            return res.status(404).json({ error: 'Pilot license not found after revocation' });
        }
        if (after.length === 0 && !exists) {
            console.log("after", after);
            console.log("exists", exists);
            return res.status(404).json({ error: 'Pilot license not found after granting' });
        }

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

        const [checkResult] = await db.query(
            `SELECT * FROM flight WHERE flightID = ?`,
            [ip_flightID]
        );
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Flight not found after offering' });
        }
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
        const [beforePilot] = await db.query(
            `SELECT * FROM pilot WHERE commanding_flight = ?`,
            [ip_flightID]
        );
        // Skipping the passengers

        const [result] = await db.query(
            `CALL flight_landing(?)`,
            [ip_flightID]
        );

        const [afterPilot] = await db.query(
            `SELECT * FROM pilot WHERE commanding_flight = ?`,
            [ip_flightID]
        );
        // Skipping the passengers
        const [afterFlight] = await db.query(
            `SELECT * FROM flight WHERE flightID = ?`,
            [ip_flightID]
        );
        for (let i = 0; i < beforePilot.length; i++) {
            if (afterPilot[i].experience !== beforePilot[i].experience + 1) {
                return res.status(404).json({ error: 'Pilot experience not updated after landing' });
            }
        }

        if (afterFlight[0].airplane_status !== 'on_ground' ) {
            return res.status(404).json({ error: 'Flight status not updated after landing' });
        }

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
        const [beforeFlight] = await db.query(
            `SELECT * FROM flight WHERE flightID = ?`,
            [ip_flightID]
        );
        const [result] = await db.query(
            `CALL flight_takeoff(?)`,
            [ip_flightID]
        );
        const [afterFlight] = await db.query(
            `SELECT * FROM flight WHERE flightID = ?`,
            [ip_flightID]
        );
        if (afterFlight[0].airplane_status !== 'in_flight' || afterFlight[0].progress !== beforeFlight[0].progress + 1) {
            return res.status(404).json({ error: 'Flight status not updated after takeoff' });
        }

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

        const [flightInfoRows] = await db.query(
            `SELECT progress, routeID, cost, support_tail 
             FROM flight 
             WHERE flightID = ? AND airplane_status = 'on_ground'`,
            [ip_flightID]
        );

        const flightInfo = flightInfoRows[0];
        if (!flightInfo) {
            return res.status(400).json({ error: 'Flight is not on ground or does not exist.' });
        }

        const { progress, routeID, cost, support_tail } = flightInfo;

        // Step 2: Check that the flight has another leg
        const [finalLegRows] = await db.query(
            `SELECT MAX(sequence) AS final_leg FROM route_path WHERE routeID = ?`,
            [routeID]
        );
        const final_leg = finalLegRows[0]?.final_leg;
        if (progress >= final_leg) {
            return res.status(400).json({ error: 'Flight has completed all legs.' });
        }

        // Step 3: Get departure and arrival airports of the next leg
        const [legInfoRows] = await db.query(
            `SELECT leg.departure, leg.arrival 
             FROM route_path 
             JOIN leg ON route_path.legID = leg.legID 
             WHERE routeID = ? AND sequence = ?`,
            [routeID, progress + 1]
        );
        const { departure: departure_airport, arrival: arrival_airport } = legInfoRows[0];

        // Step 4: Get airplane location and seat capacity
        const [airplaneRows] = await db.query(
            `SELECT locationID 
             FROM airplane 
             WHERE tail_num = ?`,
            [support_tail]
        );
        const airplane = airplaneRows[0];
        if (!airplane) {
            return res.status(400).json({ error: 'Airplane not found for the flight.' });
        }
        const {locationID: airplane_location } = airplane;

        // Step 5: Find all eligible boarding passengers (matches stored procedure conditions)
        const [boardingPassengers] = await db.query(
            `SELECT DISTINCT pa.personID, pe.first_name, pe.last_name, pa.funds
             FROM passenger pa
             JOIN person pe ON pa.personID = pe.personID
             JOIN airport a ON pe.locationID = a.locationID
             JOIN passenger_vacations pv ON pv.personID = pa.personID
             WHERE a.airportID = ?
               AND pv.sequence = 1
               AND pv.airportID = ?
               AND pa.funds >= ?`,
            [departure_airport, arrival_airport, cost]
        );

        const [result] = await db.query(
            `CALL passengers_board(?)`,
            [ip_flightID]
        );
        for (let i = 0; i < boardingPassengers.length; i++) {
            const personID = boardingPassengers[i].personID;
            const [person] = await db.query(
                `SELECT * FROM person WHERE personID = ?`,
                [personID]
            );
            if (person[0].locationID !== airplane_location) {
                return res.status(404).json({ error: 'Passenger location does not match departure airport' });
            }
            const [passenger] = await db.query(
                `SELECT * FROM passenger WHERE personID = ?`,
                [personID]
            );
            if (passenger[0].funds !== boardingPassengers[i].funds - cost) {
                return res.status(404).json({ error: 'Passenger funds not updated correctly' });
            }
        }

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
        const [flightRows] = await db.query(
            `SELECT support_tail, progress, routeID
             FROM flight
             WHERE flightID = ? AND airplane_status = 'on_ground'`,
            [ip_flightID]
        );

        const flight = flightRows[0];
        if (!flight) {
            return res.status(400).json({ error: 'Flight is either not on the ground or does not exist.' });
        }

        const { support_tail: flight_tail, progress: current_progress, routeID: flight_route } = flight;

        // Step 2: Get the current arrival airport (where passengers would disembark)
        const [arrivalRows] = await db.query(
            `SELECT leg.arrival AS destination_airport
             FROM route_path
             JOIN leg ON route_path.legID = leg.legID
             WHERE routeID = ? AND sequence = ?`,
            [flight_route, current_progress]
        );
        const destination_airport = arrivalRows[0]?.destination_airport;
        if (!destination_airport) {
            return res.status(400).json({ error: 'Could not determine destination airport.' });
        }

        // Step 3: Get the locationID for the arrival airport (airplane will be located here)
        const [airportRows] = await db.query(
            `SELECT locationID
             FROM airport
             WHERE airportID = ?`,
            [destination_airport]
        );
        const airport_location = airportRows[0]?.locationID;
        if (!airport_location) {
            return res.status(400).json({ error: 'Arrival airport location not found.' });
        }

        // Step 4: Find disembarking passengers based on matching logic in stored procedure
        const [disembarkingPassengers] = await db.query(
            `SELECT DISTINCT pa.personID, pe.first_name, pe.last_name
             FROM passenger pa
             JOIN person pe ON pa.personID = pe.personID
             JOIN airplane a ON a.locationID = pe.locationID
             JOIN passenger_vacations pv ON pv.personID = pe.personID
             WHERE a.tail_num = ?
               AND pv.sequence = 1
               AND pv.airportID = ?`,
            [flight_tail, destination_airport]
        );

        const [result] = await db.query(
            `CALL passengers_disembark(?)`,
            [ip_flightID]
        );

        for (let i = 0; i < disembarkingPassengers.length; i++) {
            const personID = disembarkingPassengers[i].personID;
            const [person] = await db.query(
                `SELECT * FROM person WHERE personID = ?`,
                [personID]
            );
            if (person[0].locationID !== airport_location) {
                return res.status(404).json({ error: 'Passenger location does not match arrival airport' });
            }
        }

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
        const [checkPilot] = await db.query(
            `SELECT * FROM pilot WHERE personID = ?`,
            [ip_personID]
        );
        // More of a basic check with just the pilot assignment
        if (checkPilot[0].commanding_flight !== ip_flightID) {
            return res.status(404).json({ error: 'Pilot not assigned to flight' });
        }
        
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
        const [pilots] = await db.query(
            `SELECT * FROM pilot WHERE commanding_flight = ?`,
            [ip_flightID]
        );
        if (pilots.length === 0) {
            return res.status(404).json({ error: 'No pilots found for the flight' });
        }
        const [result] = await db.query(
            `CALL recycle_crew(?)`,
            [ip_flightID]
        );
        // Simple check: for all pilots in the flight, check if they are recycled
        for (let i = 0; i < pilots.length; i++) {
            const [pilot] = await db.query(
                `SELECT * FROM pilot WHERE personID = ?`,
                [pilots[i].personID]
            );
            if (pilot.commanding_flight === ip_flightID) {
                return res.status(404).json({ error: 'Pilot did not recycle' });
            }
        }

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
        const [beforeFlight] = await db.query(
            `SELECT * FROM flight WHERE flightID = ?`,
            [ip_flightID]
        );
        if (beforeFlight.length === 0) {
            return res.status(404).json({ error: 'Flight not found' });
        }
        const [result] = await db.query(
            `CALL retire_flight(?)`,
            [ip_flightID]
        );
        const [checkFlight] = await db.query(
            `SELECT * FROM flight WHERE flightID = ?`,
            [ip_flightID]
        );
        if (checkFlight.length !== 0) {
            return res.status(404).json({ error: 'Flight not retired' });
        }
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