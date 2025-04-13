import React, { useState } from 'react';
import './styles/proc.css';

function AddAirport() {
    const [formData, setFormData] = useState({
        ip_airportID: '',
        ip_airport_name: '',
        ip_city: '',
        ip_state: '',
        ip_country: '',
        ip_locationID: ''
    });

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/procedures/add_airport', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Airport added successfully!');
                setStatus('success');
                setFormData({
                    ip_airportID: '',
                    ip_airport_name: '',
                    ip_city: '',
                    ip_state: '',
                    ip_country: '',
                    ip_locationID: ''
                });
            } else {
                setMessage(result.message || 'Failed to add airport.');
                setStatus('error');
            }
        } catch (error) {
            setMessage('Server error occurred.');
            setStatus('error');
        }
    };

    return (
        <div className="proc-form-container">
            <h2>Add Airport</h2>
            <form onSubmit={handleSubmit} className="proc-form">
                <input
                    type="text"
                    name="ip_airportID"
                    placeholder="Airport ID"
                    value={formData.ip_airportID}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="ip_airport_name"
                    placeholder="Airport Name"
                    value={formData.ip_airport_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="ip_city"
                    placeholder="City"
                    value={formData.ip_city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="ip_state"
                    placeholder="State"
                    value={formData.ip_state}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="ip_country"
                    placeholder="Country"
                    value={formData.ip_country}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="ip_locationID"
                    placeholder="Location ID"
                    value={formData.ip_locationID}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Airport</button>
            </form>
            {message && (
                <div className={status === 'success' ? 'success-message' : 'error-message'}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default AddAirport;