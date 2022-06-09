import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';

const MonthSelect = () => {
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
    let [monthIndex, setMonthIndex] = useState(5);
    const [selectedMonth, setSelectedMonth] = useState(monthArr[monthIndex]);

    const incrementMonth = () => {
        setMonthIndex(monthIndex++);
        if (monthIndex > monthArr.length) {
            setMonthIndex(0);
        }
        setSelectedMonth(monthArr[monthIndex]);
    };

    return (
        <div className='month-select'>
            <div className='arrow-container'>
                <ArrowLeft className='month-select-child' />
            </div>
            <p className='month month-select-child'>{selectedMonth}</p>
            <div className='arrow-container'>
                <ArrowRight className='month-select-child' onClick={incrementMonth} />
            </div>
        </div>
    );
};

export default MonthSelect;