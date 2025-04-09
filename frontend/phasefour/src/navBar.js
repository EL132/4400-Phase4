import React from 'react';
import './navBar.css';

const NavBar = () => {
    const handleClick = () => {
        window.location.href = '/'; // Redirect to the homepage
    };

    return (
        <div className="navbar" onClick={handleClick}>
            <h1>Management HQ</h1>
        </div>
    );
};

export default NavBar;