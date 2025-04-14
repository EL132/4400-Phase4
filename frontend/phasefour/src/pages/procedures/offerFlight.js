import React, { useState } from 'react';
import './styles/proc.css';

function OfferFlight() {
    const [formData, setFormData] = useState({
        ip_flightID: '',
        ip_routeID: '',
        ip_support_airline: '',
        ip_support_tail: '',
        ip_progress: '',
        ip_next_time: '',
        ip_cost: ''
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
            const response = await fetch('http://localhost:3001/procedures/offer_flight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Flight offered successfully!');
            } else {
                setStatus('error');
                setMessage(data.error || 'An error occurred.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to submit the request.');
        }
    };

    return (
        <div className="proc-form-container">
            <h2>Offer a Flight</h2>
            <form onSubmit={handleSubmit} className='proc-form'>
                <label>
                    Flight ID:
                    <input
                        type="text"
                        name="ip_flightID"
                        value={formData.ip_flightID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Route ID:
                    <input
                        type="text"
                        name="ip_routeID"
                        value={formData.ip_routeID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Support Airline:
                    <input
                        type="text"
                        name="ip_support_airline"
                        value={formData.ip_support_airline}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Support Tail:
                    <input
                        type="text"
                        name="ip_support_tail"
                        value={formData.ip_support_tail}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Progress:
                    <input
                        type="text"
                        name="ip_progress"
                        value={formData.ip_progress}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Next Time:
                    <input
                        type="text"
                        name="ip_next_time"
                        value={formData.ip_next_time}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Cost:
                    <input
                        type="number"
                        name="ip_cost"
                        value={formData.ip_cost}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {message && (
                <div className={status === 'success' ? 'success-message' : 'error-message'}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default OfferFlight;