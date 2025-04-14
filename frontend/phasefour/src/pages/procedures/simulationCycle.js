import React, { useState } from 'react';
import './styles/proc.css';

function SimulationCycle() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null); // 'success' or 'error'

    const handleSimulationCycle = async () => {
        try {
            const response = await fetch('http://localhost:3001/procedures/simulation_cycle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Simulation cycle completed successfully!');
            } else {
                setStatus('error');
                setMessage(data.error || 'An error occurred during the simulation cycle.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to execute the simulation cycle.');
        }
    };

    return (
        <div className="simulation-cycle-container">
            <h2>Run Simulation Cycle</h2>
            <button onClick={handleSimulationCycle}>Start Simulation Cycle</button>
            {message && (
                <div className={status === 'success' ? 'success-message' : 'error-message'}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default SimulationCycle;