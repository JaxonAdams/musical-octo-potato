import React from 'react';

const Day = ({ number, day }) => {
    return (
        <div className='day-card'>
            <p className='day-number'>{number}</p>
            <p className='day-header'>{day}</p>
        </div>
    );
};

export default Day;