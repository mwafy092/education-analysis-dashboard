import React, { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/details.css';
const Details: FC = () => {
    const { state }: any = useLocation();
    return (
        <div className='details__data__container'>
            <Link to='/'>Go Back To Home Page</Link>
            <div className='details__data'>
                <h2>Country</h2>
                <h3>{state?.country}</h3>
            </div>
            <div className='details__data'>
                <h2>Camp</h2>
                <h3>{state?.camp}</h3>
            </div>
            <div className='details__data'>
                <h2>School</h2>
                <h3>{state?.school}</h3>
            </div>
            <div className='details__data'>
                <h2>Month</h2>
                <h3>{state?.month}</h3>
            </div>
            <div className='details__data'>
                <h2>Number of Lessons</h2>
                <h3>{state?.lessons}</h3>
            </div>
        </div>
    );
};

export { Details };