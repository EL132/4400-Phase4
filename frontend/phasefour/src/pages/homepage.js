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
            {/* etc etc someone else please add the rest of these */}
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
        </div>
        </div>
    );
}

export default Homepage;