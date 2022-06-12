import axios from 'axios';
import React, { useState } from 'react';

const UpdateEventForm = ({ eventId, setShowEditModal}) => {
    const [formState, setFormState] = useState({
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventMonth: '',
        eventTime: '',
        eventDay: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = e => {
        if (e.target.name === 'eventTime') {
            const re = /^(\d{1,2}:\d{2})\s(A|P)M$/;
            let isValidFormat = re.test(e.target.value);
            if (!isValidFormat) {
                setErrorMessage('Your time is formatted incorrectly. For example, use 10:30 AM.');
            }
        }

        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        // format date
        let eventDay = formState.eventDay;
        // eslint-disable-next-line no-unused-vars
        let [_, eventMonth, eventDate] = eventDay.split('-');
            
        if (eventDay.split('-').length > 1) {
            if (eventMonth.split('')[0] === '0') {
                eventMonth = eventMonth.split('').pop();
            }
    
            if (eventDate.split('')[0] === '0') {
                eventDate = eventDate.split('').pop();
            }
    
            eventMonth = eventMonth - 1;
            eventDate = parseInt(eventDate);
            console.log(eventMonth, eventDate);    
        }

        const submitData = {};

        if (eventMonth) {
            submitData.eventMonth = eventMonth
        }

        if (eventDate) {
            submitData.eventDate = eventDate
        }

        if (formState.eventName.length) {
            submitData.eventName = formState.eventName
        }

        if (formState.eventDescription.length) {
            submitData.eventDetails = formState.eventDescription
        }

        if (formState.eventTime.length) {
            // just double checking the time here
            const re = /^(\d{1,2}:\d{2})\s(A|P)M$/;
            const isValidFormat = re.test(formState.eventTime);
            if (isValidFormat) {
                submitData.eventTime = formState.eventTime;
            }
        }

        console.log(submitData);

        axios.put(`/api/events/${eventId}`, submitData)
        .then(() => {
            setShowEditModal(false);
        })
        .catch(err => console.log(err));
    };

    return (
        <form className='edit-event-form' onSubmit={handleSubmit}>
            <p className='extra-info'>Fill in all or any of these options to change the event.</p>
            <input onChange={handleChange} className='form-input' name='eventName' defaultValue={formState.eventName} placeholder='Event Name' />
            <input onChange={handleChange} className='form-input' name='eventDescription' defaultValue={formState.eventDescription} placeholder='Event Description' />
            <input onBlur={handleChange} className='form-input' name='eventTime' defaultValue={formState.eventTime} placeholder='Event Time (eg 10:30 AM)' />
            <input type='date' onChange={handleChange} className='form-input' name='eventDay' defaultValue={formState.eventDay} />
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <button className='modal-close' type='submit'>Submit</button>
        </form>
    );
};

export default UpdateEventForm;