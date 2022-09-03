import React, { FC, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/chart.css';
import { useSelector } from 'react-redux';
const Chart: FC = () => {
    const { chartData } = useSelector((state: any) => state.lessons);
    const [lineChartData, setLineChartData] = useState<any>([]);
    useEffect(() => {
        setLineChartData(chartData);
    }, [chartData]);
    console.log(lineChartData);
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return (
        <div className='chart__container'>
            <h3>No of lessons</h3>
            <div className='chart'>
                <Line
                    data={{
                        labels: months,
                        datasets: lineChartData.map((data: any) => {
                            return {
                                label: data[0].school,
                                data: data,
                                borderColor: data[0].color,
                                tension: 0.2,
                            };
                        }),
                    }}
                    options={{
                        parsing: {
                            xAxisKey: 'month',
                            yAxisKey: 'lessons',
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export { Chart };
