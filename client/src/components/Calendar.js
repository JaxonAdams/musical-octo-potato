import React, { useState } from 'react';

import MonthSelect from './MonthSelect';
import Month from './Month';

const Calendar = () => {
    const monthArr = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ];

    const currentDate = new Date();

    let [monthIndex, setMonthIndex] = useState(currentDate.getMonth());

    return (
        <div className='calendar'>
            <MonthSelect monthArr={monthArr} monthIndex={monthIndex} setMonthIndex={setMonthIndex} />
            <Month monthArr={monthArr} monthIndex={monthIndex} />
            <h2>Displaying Calendar for {currentDate.getFullYear()}</h2>
        </div>
    );
};

export default Calendar;