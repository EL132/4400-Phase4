import React, { useState, useEffect } from 'react';
import './styles/views.css';

function PeopleInAir() {
    const [peopleData, setPeopleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/views/people_in_the_air');
                const data = await response.json();

                if (response.ok) {
                    setPeopleData(data.data);
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

    if (loading) return <div>Loading people in the air...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="views-table-container">
            <table className="views-table">
                <thead>
                    <tr>
                        <th>Departing From</th>
                        <th>Arriving At</th>
                        <th># Airplanes</th>
                        <th>Airplane List</th>
                        <th>Flight List</th>
                        <th>Earliest Arrival</th>
                        <th>Latest Arrival</th>
                        <th># Pilots</th>
                        <th># Passengers</th>
                        <th>Total People</th>
                        <th>Person List</th>
                    </tr>
                </thead>
                <tbody>
                    {peopleData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.departing_from}</td>
                            <td>{row.arriving_at}</td>
                            <td>{row.num_airplanes}</td>
                            <td>{row.airplane_list}</td>
                            <td>{row.flight_list}</td>
                            <td>{row.earliest_arrival}</td>
                            <td>{row.latest_arrival}</td>
                            <td>{row.num_pilots}</td>
                            <td>{row.num_passengers}</td>
                            <td>{row.joint_pilots_passengers}</td>
                            <td>{row.person_list}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PeopleInAir;
