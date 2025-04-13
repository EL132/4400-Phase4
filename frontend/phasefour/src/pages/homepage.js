import React from 'react';
import './styles/homepage.css';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div className="homepage-container">
        <header className="homepage-header">
            <h1>Flight Management Dashboard</h1>
            <p>Welcome to your airline simulation control center.</p>
        </header>

        <h2>Procedures</h2>
        <div className="homepage-cards">
            <Link to="/procedures/add-airplane" className="card">
                    <h2>Add Airplane</h2>
                    <p>Add an airplane to the database.</p>
            </Link>
            <Link to="/procedures/add-airport" className="card">
                    <h2>Add Airport</h2>
                    <p>Add an airport to the database.</p>
            </Link>
            
            <Link to="/procedures/add-person" className="card">
                <h2>Add Person</h2>
                <p>Add a person to the database.</p>
            </Link>

            <Link to="/procedures/grant-or-revoke" className="card">
                <h2>Grant/Revoke Pilot License</h2>
                <p>Grant or revoke a pilot's license.</p>
            </Link>

            <Link to="/procedures/offer-flight" className="card">
                <h2>Offer Flight</h2>
                <p>Offer a flight to a passenger.</p>
            </Link>

            <Link to="/procedures/flight-landing" className="card">
                <h2>Flight Landing</h2>
                <p>Handle the landing of a flight.</p>
            </Link>

            <Link to="/procedures/flight-takeoff" className="card">
                <h2>Flight Takeoff</h2>
                <p>Handle the takeoff of a flight.</p>
            </Link>

            <Link to="/procedures/passengers-board" className="card">
                <h2>Passengers Board</h2>
                <p>Handle the boarding process for passengers.</p>
            </Link>

            <Link to="/procedures/passengers-disembark" className="card">
                <h2>Passengers Disembark</h2>
                <p>Handle the disembarking process for passengers.</p>
            </Link>

            <Link to="/procedures/assign-pilot" className="card">
                <h2>Assign Pilot</h2>
                <p>Assign a pilot to a flight.</p>
            </Link>

            <Link to="/procedures/recycle-crew" className="card">
                <h2>Recycle Crew</h2>
                <p>Reassign crew for a flight.</p>
            </Link>

            <Link to="/procedures/retire-flight" className="card">
                <h2>Retire Flight</h2>
                <p>Retire a flight from service.</p>
            </Link>

            <Link to="/procedures/simulation-cycle" className="card">
                <h2>Simulation Cycle</h2>
                <p>Run a simulation cycle to process events.</p>
            </Link>
        </div>
        

        <h2>Views</h2>
        <div className="homepage-cards">
            <Link to="/views/flights-in-air" className="card">
                <h2>Flights In Air</h2>
                <p>View all flights currently in progress.</p>
            </Link>

            <Link to="/views/flights-on-ground" className="card">
                <h2>Flights On Ground</h2>
                <p>Check out flights currently at the gate or taxiing.</p>
            </Link>
            <Link to="/views/alternative-airports" className="card">
                <h2>Alternative Airports</h2>
                <p>Check out alternative airports.</p>
            </Link>
            <Link to="/views/people-in-air" className="card">
                <h2>People In Air</h2>
                <p>Check out the people who are currently in the air.</p>
            </Link>
            <Link to="/views/people-on-ground" className="card">
                <h2>People On Ground</h2>
                <p>Check out the people who are currently on the ground.</p>
            </Link>
            <Link to="/views/route_summary" className="card">
                <h2>Route Summary</h2>
                <p>Check out some routes.</p>
            </Link>
        </div>
        </div>
    );
}

export default Homepage;