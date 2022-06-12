import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddEventForm = ({ setShowAddModal }) => {
    const { month, day } = useParams();

    const [formState, setFormState] = useState({ 
        eventName: '',
        eventDetails: '',
        eventMonth: month,
        eventDate: day,
        eventTime: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = e => {
        if (e.target.name === 'eventTime') {
            const re = /^(\d{1,2}:\d{2})\s(A|P)M$/;
            let isValidFormat = re.test(e.target.value);
            if (!isValidFormat) {
                setErrorMessage('Your time is formatted incorrectly. For example, use 10:30 AM.');
            } else {
                setErrorMessage('');
            }
            console.log(formState);
        }
        
        if (e.target.name === 'eventName') {
            if (!e.target.value.length) {
                setErrorMessage('Event name is required.');
            } else {
                setErrorMessage('');
            }
        }

        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        // just double checking the time here
        const re = /^(\d{1,2}:\d{2})\s(A|P)M$/;
        const isValidFormat = re.test(formState.eventTime);

        console.log(formState);

        if (formState.eventName.length && formState.eventTime.length && isValidFormat) {
            axios.post('/api/events', formState).then(() => {
                setShowAddModal(false);
            })
            .catch(err => console.log(err));
        }
    };
    
    return (
        <form className='add-event-form' onSubmit={handleSubmit}>
            <input onChange={handleChange} className='form-input' name='eventName' defaultValue={formState.eventName} placeholder='Event Name' />
            <input onBlur={handleChange} className='form-input' name='eventDetails' defaultValue={formState.eventDetails} placeholder='Event Details (optional)' />
            <input onBlur={handleChange} className='form-input' name='eventTime' defaultValue={formState.eventTime} placeholder='Event Time (eg 10:30 AM)' />
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <button className='modal-close' type='submit'>Submit</button>
        </form>
    );
};

export default AddEventForm;