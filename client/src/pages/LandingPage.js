import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return(
        <div className='landing-page'>
            <h1 className='welcome'>Jaxon's Planner</h1>
            <div className='welcome-txt-container'>
                <p className='welcome-txt'>
                    Welcome! This is a small personal project built with the MERN stack -- MongoDB, Express.js, React, and Node.js. In this app, I also messed around with custom modals, regex validation, and some other cool stuff. Feel free to poke around!
                </p>
                <p className='welcome-txt'>
                    You can view the code <a rel='noreferrer' target='_blank' href='https://github.com/JaxonAdams/musical-octo-potato'>here.</a>
                </p>
            </div>
            <Link className='landing-btn' to='/calendar'>Start Planning!</Link>
        </div>
    );
};

export default LandingPage;