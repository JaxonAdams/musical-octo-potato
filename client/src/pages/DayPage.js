import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Modal from '../components/Modal';

const DayPage = () => {
    const { month, day } = useParams();
    const currentYear = new Date().getFullYear();
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
    const [eventList, setEventList] = useState([]);
    
    const [showAddModal, setShowAddModal] = useState(false);

    const sortEventList = eventList => {
        // put AM events before PM events
        let sortedList = [];
        let am = [];
        let pm = [];
        for (let i = 0; i < eventList.length; i++) {
            if (eventList[i].eventTime.split(' ')[1] === 'AM') {
                am.push(eventList[i]);
            } else if (eventList[i].eventTime.split(' ')[1] === 'PM') {
                pm.push(eventList[i]);
            }
        }
        // split and sort hours and seconds
        for(let i = 0; i < am.length; i++) {
            am[i].time = am[i].eventTime.split(' ')[0].split(':').join('');
        }
        am.sort((a, b) => a.time - b.time);
        for(let i = 0; i < pm.length; i++) {
            pm[i].time = pm[i].eventTime.split(' ')[0].split(':').join('');
        }
        pm.sort((a, b) => a.time - b.time);

        // put sorted arrays back together
        return [...sortedList, ...am, ...pm];
    };

    useEffect(() => {
        axios.get('/api/events').then(response => {
            const filteredList = response.data.filter(
                event => event.eventMonth.toString() === month && event.eventDate.toString() === day
            );
            const sortedList = sortEventList(filteredList);
            setEventList(sortedList);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='day-page'>
            <Header />
            <h1 className='day-page-title'>{monthArr[month]} {day}, {currentYear}</h1>
            {eventList.length ? (
                <div className='event-list'>
                    <button onClick={() => setShowAddModal(true)} className='add-event-modal-btn'>Add Event</button>
                    <Modal showAddModal={showAddModal} setShowAddModal={setShowAddModal}>
                        <h3 className='modal-title'>Add an Event</h3>
                        {/* implement form component here  */}
                    </Modal>
                    <h2>Here's what you have planned...</h2>
                    {eventList.map(event => (
                        <div className='day-card event-card' key={event._id}>
                            <p className='event-time'>{event.eventTime}:</p>
                            <p className='event-name'>{event.eventName}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='event-list'>
                    <button onClick={() => setShowAddModal(true)} className='add-event-modal-btn'>Add Event</button>
                    <Modal showAddModal={showAddModal} setShowAddModal={setShowAddModal}>
                        <p>Testing a modal</p>
                    </Modal>
                    <h2>You don't have any plans yet!</h2>
                </div>
            )}
        </div>
    );
};

export default DayPage;