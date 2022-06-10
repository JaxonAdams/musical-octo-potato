import React from 'react';

import MonthSelect from './MonthSelect';
import Month from './Month';

const Calendar = () => {
    return (
        <div className='calendar'>
            <MonthSelect />
            <Month />
        </div>
    );
};

export default Calendar;