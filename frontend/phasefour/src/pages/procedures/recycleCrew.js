import React, { useState } from 'react';
import './styles/proc.css';

function RecycleCrew() {
    const [formData, setFormData] = useState({
        ip_flightID: ''
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
            const response = await fetch('http://localhost:3001/procedures/recycle_crew', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Crew recycled successfully!');
            } else {
                setStatus('error');
                setMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to submit the request.');
        }
    };

    return (
        <div className="proc-form-container">
            <h2>Recycle Crew</h2>
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

export default RecycleCrew;