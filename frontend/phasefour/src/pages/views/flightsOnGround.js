import React, { useState, useEffect } from 'react';
import './styles/views.css';

function FlightsOnGround() {
    const [groundFlights, setGroundFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/views/flights_on_the_ground');
                const data = await response.json();

                if (response.ok) {
                    setGroundFlights(data.data);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Failed to fetch data from the server.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading flights on the ground...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="views-table-container">
            <table className="views-table">
                <thead>
                    <tr>
                        <th>Departing From</th>
                        <th># of Flights</th>
                        <th>Flight List</th>
                        <th>Earliest Arrival</th>
                        <th>Latest Arrival</th>
                        <th>Airplane List</th>
                    </tr>
                </thead>
                <tbody>
                    {groundFlights.map((flight, index) => (
                        <tr key={index}>
                            <td>{flight.departing_from}</td>
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

export default FlightsOnGround;