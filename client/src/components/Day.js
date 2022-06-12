import React from 'react';
import { Link } from 'react-router-dom';

const Day = ({ number, month, day }) => {
    return (
        <Link to={`/day/${month}/${number}`} className='day-card'>
            <p className='day-number'>{number}</p>
            <p className='day-header'>{day}</p>
        </Link>
    );
};

export default Day;