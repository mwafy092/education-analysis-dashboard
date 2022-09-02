import React, { FC } from 'react';
import '../styles/filters.css';
const Filters: FC = () => {
    return (
        <section className='filters__container'>
            <div className='filter'>
                <label htmlFor='country'>Select Country</label>
                <select id='country'>
                    <option>kenya</option>
                </select>
            </div>
            <div className='filter'>
                <label htmlFor='camp'>Select Camp</label>
                <select id='camp'>
                    <option>kakuma</option>
                </select>
            </div>
            <div className='filter'>
                <label htmlFor='school'>Select School</label>
                <select id='school'>
                    <option>Kenya</option>
                </select>
            </div>
        </section>
    );
};

export { Filters };
