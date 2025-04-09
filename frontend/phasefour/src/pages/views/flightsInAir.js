import React, { useState, useEffect } from 'react';
import './styles/flightsInAir.css';

function FlightsInAir() {
    const [flightsData, setFlightsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the data from the backend on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/views/flights_in_the_air');
                const data = await response.json();

                if (response.ok) {
                    setFlightsData(data.data);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Failed to fetch data from the backend.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Render a loading message or error message if applicable
    if (loading) {
        return <div className="loading">Loading flights data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="flights-container">
            <h1>Flights in the Air</h1>
            <table className="flights-table">
                <thead>
                    <tr>
                        <th>Departing From</th>
                        <th>Arriving At</th>
                        <th>Number of Flights</th>
                        <th>Flight List</th>
                        <th>Earliest Arrival</th>
                        <th>Latest Arrival</th>
                        <th>Airplane List</th>
                    </tr>
                </thead>
                <tbody>
                    {flightsData.map((flight, index) => (
                        <tr key={index}>
                            <td>{flight.departing_from}</td>
                            <td>{flight.arriving_at}</td>
                            <td>{flight.num_flights}</td>
                            <td>{flight.flight_list}</td>
                            <td>{flight.earliest_arrival}</td>
                            <td>{flight.latest_arrival}</td>
                            <td>{flight.airplane_list}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FlightsInAir;