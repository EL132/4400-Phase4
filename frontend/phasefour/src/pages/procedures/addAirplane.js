import React, { useState } from 'react';
import './styles/addAirplane.css';

function AddAirplane() {
    const [formData, setFormData] = useState({
        ip_airlineID: '',
        ip_tail_num: '',
        ip_seat_capacity: '',
        ip_speed: '',
        ip_locationID: '',
        ip_plane_type: '',
        ip_maintenanced: null,
        ip_model: '',
        ip_neo: null, 
    });

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare the data for submission, handling empty strings to be null
            const submissionData = {
                ...formData,
                ip_seat_capacity: formData.ip_seat_capacity ? parseInt(formData.ip_seat_capacity) : null,
                ip_speed: formData.ip_speed ? parseInt(formData.ip_speed) : null,
                ip_locationID: formData.ip_locationID || null,
                ip_plane_type: formData.ip_plane_type || null,
                ip_model: formData.ip_model || null,
                ip_neo: formData.ip_neo === null ? null : formData.ip_neo, // Handle NEO null
            };

            console.log(submissionData);

            const response = await fetch('http://localhost:3001/procedures/add_airplane', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Airplane added successfully.');
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to add airplane.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error or server not reachable.');
        }
    };

    return (
        <div className="add-airplane-container">
            <h1>Add a New Airplane</h1>
            <form onSubmit={handleSubmit} className="add-airplane-form">
                <label>
                    Airline ID:
                    <input type="text" name="ip_airlineID" value={formData.ip_airlineID} onChange={handleChange} required />
                </label>

                <label>
                    Tail Number:
                    <input type="text" name="ip_tail_num" value={formData.ip_tail_num} onChange={handleChange} required />
                </label>

                <label>
                    Seat Capacity:
                    <input type="number" name="ip_seat_capacity" value={formData.ip_seat_capacity} onChange={handleChange} required />
                </label>

                <label>
                    Speed:
                    <input type="number" name="ip_speed" value={formData.ip_speed} onChange={handleChange} required />
                </label>

                <label>
                    Location ID:
                    <input type="text" name="ip_locationID" value={formData.ip_locationID} onChange={handleChange} />
                </label>

                <label>
                    Plane Type:
                    <input type="text" name="ip_plane_type" value={formData.ip_plane_type} onChange={handleChange} />
                </label>

                <label className="checkbox-label">
                    Maintenanced:
                    <input
                        type="radio"
                        name="ip_maintenanced"
                        value="true"
                        checked={formData.ip_maintenanced === true}
                        onChange={(e) => setFormData({ ...formData, ip_maintenanced: true })}
                    />
                    Yes
                    <input
                        type="radio"
                        name="ip_maintenanced"
                        value="false"
                        checked={formData.ip_maintenanced === false}
                        onChange={(e) => setFormData({ ...formData, ip_maintenanced: false })}
                    />
                    No
                </label>

                <label>
                    Model:
                    <input type="text" name="ip_model" value={formData.ip_model} onChange={handleChange} />
                </label>

                <label className="checkbox-label">
                    NEO:
                    <input
                        type="radio"
                        name="ip_neo"
                        value="true"
                        checked={formData.ip_neo === true}
                        onChange={(e) => setFormData({ ...formData, ip_neo: true })}
                    />
                    Yes
                    <input
                        type="radio"
                        name="ip_neo"
                        value="false"
                        checked={formData.ip_neo === false}
                        onChange={(e) => setFormData({ ...formData, ip_neo: false })}
                    />
                    No
                </label>

                <button type="submit">Submit</button>
            </form>

            {status && (
                <div className={`submit-message ${status}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default AddAirplane;
