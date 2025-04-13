import React, { useState, useEffect } from 'react';
import './styles/views.css';

function AlternativeAirports() {
    const [airportData, setAirportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/views/alternative_airports');
                const data = await response.json();

                if (response.ok) {
                    setAirportData(data.data);
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

    if (loading) return <div>Loading alternative airports...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="views-table-container">
            <h2>Alternative Airports</h2>
            <table className="views-table">
                <thead>
                    <tr>
                        {airportData.length > 0 && Object.keys(airportData[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {airportData.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AlternativeAirports;