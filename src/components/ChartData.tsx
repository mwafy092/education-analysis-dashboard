import React, { FC } from 'react';
import '../styles/chart-data.css';
const ChartData: FC = () => {
    return (
        <div className='chart__data__container'>
            <div className='total__schools__data'>
                <h2>
                    <span className='total__lessons__num'>80</span> lessons
                </h2>
                <p>in kakuma</p>
            </div>
            <div className='schools__data__container'>
                <div className='school__data'>
                    <input type='radio' />
                    <div className='school__info'>
                        <h3>
                            <span className='lesson__num'>10</span> lessons
                        </h3>
                        <p>in Greenlight</p>
                    </div>
                </div>
                <div className='school__data'>
                    <input type='radio' />
                    <div className='school__info'>
                        <h3>
                            <span className='lesson__num'>10</span> lessons
                        </h3>
                        <p>in Greenlight</p>
                    </div>
                </div>
                <div className='school__data'>
                    <input type='radio' />
                    <div className='school__info'>
                        <h3>
                            <span className='lesson__num'>10</span> lessons
                        </h3>
                        <p>in Greenlight</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ChartData };
