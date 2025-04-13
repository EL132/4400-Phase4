import React, { useState } from 'react';
import './styles/proc.css';

function GrantOrRevoke() {
    const [formData, setFormData] = useState({
        ip_personID: '',
        ip_license: ''
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
            const response = await fetch('http://localhost:3001/procedures/grant_or_revoke_pilot_license', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'License status updated successfully!');
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
            <h2>Grant or Revoke Pilot License</h2>
            <form onSubmit={handleSubmit} className='proc-form'>
                <label>
                    Person ID:
                    <input
                        type="text"
                        name="ip_personID"
                        value={formData.ip_personID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    License:
                    <input
                        type="text"
                        name="ip_license"
                        value={formData.ip_license}
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

export default GrantOrRevoke;