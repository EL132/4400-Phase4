import React, { useState, useEffect } from 'react';
import './styles/views.css';

function PeopleOnGround() {
    const [peopleData, setPeopleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/views/people_on_the_ground');
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

    if (loading) return <div>Loading people on the ground...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="views-table-container">
            <table className="views-table">
                <thead>
                    <tr>
                        <th>Departing From</th>
                        <th>Airport</th>
                        <th>Airport Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Num Pilots</th>
                        <th>Num Passengers</th>
                        <th>Total People</th>
                        <th>Person List</th>
                    </tr>
                </thead>
                <tbody>
                    {peopleData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.departing_from}</td>
                            <td>{row.airport}</td>
                            <td>{row.airport_name}</td>
                            <td>{row.city}</td>
                            <td>{row.state}</td>
                            <td>{row.country}</td>
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

export default PeopleOnGround;