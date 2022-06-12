import React from 'react';
import { monthInfo } from '../utils/monthInfo';

import Day from './Day';

const Month = ({ monthArr, monthIndex }) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const displayedMonth = monthInfo[monthIndex];
    const daysArr = displayedMonth.days.split(',');

    return (
        <div className='month'>
            {daysArr.map((day) => {
                const d = new Date(currentYear, monthIndex, day);
                let dayName = d.getDay();
                if (dayName === 0) {
                    dayName = 'Sunday';
                } else if (dayName === 1) {
                    dayName = 'Monday';
                } else if (dayName === 2) {
                    dayName = 'Tuesday';
                } else if (dayName === 3) {
                    dayName = 'Wednesday';
                } else if (dayName === 4) {
                    dayName = 'Thursday';
                } else if (dayName === 5) {
                    dayName = 'Friday';
                } else if (dayName === 6) {
                    dayName = 'Saturday';
                }

                return <Day number={day} month={monthIndex} day={dayName} key={day} />;
            })}
        </div>
    );
};

export default Month;