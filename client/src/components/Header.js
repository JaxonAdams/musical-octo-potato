import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='home-header'>
            <Link to='/' className='header-link'>Home</Link>
        </header>
    );
};

export default Header;