import React, { FC } from 'react';
import { Chart } from './Chart';
import { ChartData } from './ChartData';
import '../styles/dashboard.css';
const Dashboard: FC = () => {
    return (
        <section className='dashboard__container'>
            <Chart />
            <ChartData />
        </section>
    );
};

export { Dashboard };
