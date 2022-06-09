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

    const currentDate = new Date();

    let [monthIndex, setMonthIndex] = useState(currentDate.getMonth());

    const incrementMonth = () => {
        monthIndex++
        if (monthIndex >= monthArr.length) {
            setMonthIndex(0);
        } else {
            setMonthIndex(monthIndex);
        }
    };

    const decrementMonth = () => {
        monthIndex--
        if (monthIndex < 0) {
            setMonthIndex(monthArr.length - 1);
        } else {
            setMonthIndex(monthIndex);
        }
    };

    return (
        <div className='month-select'>
            <div className='arrow-container' onClick={decrementMonth}>
                <ArrowLeft className='month-select-child' />
            </div>
            <p className='month month-select-child'>{monthArr[monthIndex]}</p>
            <div className='arrow-container' onClick={incrementMonth}>
                <ArrowRight className='month-select-child' />
            </div>
        </div>
    );
};

export default MonthSelect;