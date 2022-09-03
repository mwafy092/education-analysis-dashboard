import React, { FC, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/chart.css';
const Chart: FC = () => {
    const mockData = [
        { id: 1, month: 'Jan', lessons: '100' },
        { id: 2, month: 'Feb', lessons: '200' },
        { id: 2, month: 'Mar', lessons: '50' },
        { id: 2, month: 'Apr', lessons: '100' },
        { id: 2, month: 'May', lessons: '150' },
        { id: 2, month: 'Jun', lessons: '150' },
        { id: 2, month: 'Jul', lessons: '150' },
        { id: 2, month: 'Aug', lessons: '150' },
        { id: 2, month: 'Sep', lessons: '150' },
        { id: 2, month: 'Oct', lessons: '150' },
        { id: 2, month: 'Nov', lessons: '0' },
        { id: 2, month: 'Dec', lessons: '250' },
    ];
    const [chartData] = useState({
        labels: mockData.map((m) => m.month),
        datasets: [
            {
                label: 'lessons',
                data: mockData.map((m) => m.lessons),
            },
        ],
    });
    return (
        <div className='chart__container'>
            <h3>No of lessons</h3>
            <div className='chart'>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export { Chart };
