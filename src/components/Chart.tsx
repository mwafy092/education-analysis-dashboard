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
    return (
        <div className='chart__container'>
            <h3>No of lessons</h3>
            <div className='chart'>
                <Line
                    data={{
                        labels: lineChartData.map((data: any) => data.month),
                        datasets: [
                            {
                                label: lineChartData[0]?.school,
                                data: lineChartData.map(
                                    (data: any) => data.lessons
                                ),
                                borderColor: lineChartData[0]?.color,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export { Chart };
