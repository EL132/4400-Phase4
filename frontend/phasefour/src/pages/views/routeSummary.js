import React, { useState, useEffect } from 'react';
import './styles/views.css';

function RouteSummary() {
    const [routeData, setRouteData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/views/route_summary');
                const data = await response.json();

                if (response.ok) {
                    setRouteData(data.data);
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

    if (loading) return <div>Loading route summary...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="views-table-container">
            <table className="views-table">
                <thead>
                    <tr>
                        <th>Route</th>
                        <th>Number of Legs</th>
                        <th>Leg Sequence</th>
                        <th>Route Length</th>
                        <th>Number of Flights</th>
                        <th>Flight List</th>
                        <th>Airport Sequence</th>
                    </tr>
                </thead>
                <tbody>
                    {routeData.map((route, index) => (
                        <tr key={index}>
                            <td>{route.route}</td>
                            <td>{route.num_legs}</td>
                            <td>{route.leg_sequence}</td>
                            <td>{route.route_length}</td>
                            <td>{route.num_flights}</td>
                            <td>{route.flight_list}</td>
                            <td>{route.airport_sequence}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RouteSummary;