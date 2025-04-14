import React, { useState } from 'react';
import './styles/proc.css';

function AddPerson() {
    const [formData, setFormData] = useState({
        ip_personID: null,
        ip_first_name: null,
        ip_last_name: null,
        ip_locationID: null,
        ip_taxID: null,
        ip_experience: null,
        ip_miles: null,
        ip_funds: null
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
            const response = await fetch('http://localhost:3001/procedures/add_person', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Person added successfully!');
            } else {
                setStatus('error');
                setMessage(data.error || 'An error occurred while adding the person.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Failed to connect to the server.');
        }
    };

    return (
        <div className="proc-form-container">
            <h2>Add Person</h2>
            <form onSubmit={handleSubmit} className="proc-form">
                <input type="text" name="ip_personID" placeholder="Person ID" value={formData.ip_personID} onChange={handleChange} required />
                <input type="text" name="ip_first_name" placeholder="First Name" value={formData.ip_first_name} onChange={handleChange} required />
                <input type="text" name="ip_last_name" placeholder="Last Name" value={formData.ip_last_name} onChange={handleChange} required />
                <input type="text" name="ip_locationID" placeholder="Location ID" value={formData.ip_locationID} onChange={handleChange} required />
                <input type="text" name="ip_taxID" placeholder="Tax ID" value={formData.ip_taxID} onChange={handleChange} required />
                <input type="number" name="ip_experience" placeholder="Experience" value={formData.ip_experience} onChange={handleChange} />
                <input type="number" name="ip_miles" placeholder="Miles" value={formData.ip_miles} onChange={handleChange} />
                <input type="number" name="ip_funds" placeholder="Funds" value={formData.ip_funds} onChange={handleChange} />
                <button type="submit">Add Person</button>
            </form>
            {message && (
                <div className={status === 'success' ? 'success-message' : 'error-message'}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default AddPerson;