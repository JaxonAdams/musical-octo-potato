import React, { useEffect } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Calendar from '../components/Calendar';

const Home = () => {
    useEffect(() => {
        axios.get('/api/events')
        .then(response => console.log(response.data));
    }, []);

    return (
        <div>
            <Header />
            <Calendar />
        </div>
    );
};

export default Home;