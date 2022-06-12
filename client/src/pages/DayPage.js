import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pencil } from 'react-bootstrap-icons';

import Header from '../components/Header';
import Modal from '../components/Modal';
import AddEventForm from '../components/AddEventForm';
import UpdateEventForm from '../components/UpdateEventForm';

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
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({});

    const sortEventList = eventList => {
        // put AM events before PM events
        let sortedList = [];
        let am = [];
        let pm = [];
        for (let i = 0; i < eventList.length; i++) {
            if (eventList[i].eventTime.split(' ')[1] === 'AM' || eventList[i].eventTime.split(' ')[1] === 'am') {
                am.push(eventList[i]);
            } else if (eventList[i].eventTime.split(' ')[1] === 'PM' || eventList[i].eventTime.split(' ')[1] === 'pm') {
                pm.push(eventList[i]);
            }
        }
        // split and sort hours and seconds
        for(let i = 0; i < am.length; i++) {
            am[i].time = am[i].eventTime.split(' ')[0].split(':').join('');
            if (am[i].eventTime.split(':')[0] === '12') {
                am[i].time = am[i].time.split('');
                am[i].time.shift();
                am[i].time.shift();
                am[i].time = am[i].time.join('');
            }
        }
        am.sort((a, b) => a.time - b.time);
        for(let i = 0; i < pm.length; i++) {
            pm[i].time = pm[i].eventTime.split(' ')[0].split(':').join('');
            if (pm[i].eventTime.split(':')[0] === '12') {
                pm[i].time = pm[i].time.split('');
                pm[i].time.shift();
                pm[i].time.shift();
                pm[i].time = pm[i].time.join('');
            }
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
    }, [showAddModal, showEditModal]);

    const handleEdit = (event) => {
        setCurrentEvent(event);
        setShowEditModal(true);
    };

    const handleDelete = (event) => {
        axios.delete(`/api/events/${event._id}`)
        .then(() => {
            axios.get('/api/events').then(response => {
                const filteredList = response.data.filter(
                    event => event.eventMonth.toString() === month && event.eventDate.toString() === day
                );
                const sortedList = sortEventList(filteredList);
                setEventList(sortedList);
            });
        });
    };

    return (
        <div className='day-page'>
            <Header />
            <h1 className='day-page-title'>{monthArr[month]} {day}, {currentYear}</h1>
            <Modal showAddModal={showAddModal} setShowAddModal={setShowAddModal}>
                <h3 className='modal-title'>Add an Event</h3>
                <AddEventForm setShowAddModal={setShowAddModal} />
            </Modal>
            <Modal showAddModal={showEditModal} setShowAddModal={setShowEditModal}>
                <h3 className='modal-title'><Pencil /> {currentEvent.eventName}</h3>
                <UpdateEventForm eventId={currentEvent._id} setShowEditModal={setShowEditModal} />
            </Modal>
            {eventList.length ? (
                <div className='event-list'>
                    <button onClick={() => setShowAddModal(true)} className='add-event-modal-btn'>Add Event</button>
                    <h2>Here's what you have planned...</h2>
                    {eventList.map(event => (
                        <div className='event-list-item' key={event._id} idvalue={event._id}>
                            <div className='day-card event-card'>
                                <div className='txt-container'>
                                    <p className='event-time'>{event.eventTime}:</p>
                                    <p className='event-name'>{event.eventName}</p>
                                    {event.eventDetails && <p className='event-description'>({event.eventDetails})</p>}
                                </div>
                                <div className='btn-container'>
                                    <button className='edit-event' onClick={() => handleEdit(event)}>Edit</button>
                                    <button className='delete-event' onClick={() => handleDelete(event)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='event-list'>
                    <button onClick={() => setShowAddModal(true)} className='add-event-modal-btn'>Add Event</button>
                    <h2>You don't have any plans yet!</h2>
                </div>
            )}
        </div>
    );
};

export default DayPage;