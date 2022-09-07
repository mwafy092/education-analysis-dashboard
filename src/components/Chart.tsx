import React, { FC, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/chart.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Lessons, StateTypes } from '../reducers/types';
import { months, sortBasedOnMonth } from '../utils/tools';
const Chart: FC = () => {
    const navigate = useNavigate();
    const [colors, setColors] = useState<any>({});
    const [lineChartData, setLineChartData] = useState<Lessons[]>([]);
    const { chartData, country, camp, educationData } = useSelector(
        (state: StateTypes) => state.lessons
    );

    useEffect(() => {
        let colorsObject: any = {};
        chartData.forEach((color: any) => {
            colorsObject = { ...colorsObject, ...color };
        });
        setColors(colorsObject);
    }, [chartData]);

    useEffect(() => {
        let educationDataPerCamp = educationData[country]?.[camp] || [];
        let sectionData: any = {};
        for (let i of Object.keys(educationDataPerCamp)) {
            sectionData = {
                ...sectionData,
                [`${i}`]: sortBasedOnMonth(
                    Object.values(educationDataPerCamp[i])
                ),
            };
        }
        let _CHART_DATA: Lessons[] = [];
        for (let i of chartData) {
            let key = Object.keys(i)[0];

            _CHART_DATA.push(sectionData[key]);
        }
        setLineChartData(_CHART_DATA);
    }, [camp, chartData, country, educationData]);

    return (
        <div className='chart__container'>
            <h3>No of lessons</h3>
            <div className='chart'>
                <Line
                    data={{
                        labels: months,
                        datasets: lineChartData?.map(
                            (data: any, index: number) => {
                                if (data && chartData.length !== 0) {
                                    return {
                                        label: data[0]?.school,
                                        data: data,
                                        borderColor: colors[data[0]?.school],
                                        tension: 0.2,
                                    };
                                } else {
                                    return {
                                        label: [],
                                        data: [],
                                        borderColor: [],
                                        tension: 0.2,
                                    };
                                }
                            }
                        ),
                    }}
                    options={{
                        onClick: (evt, activeElement: any) => {
                            let pointData =
                                activeElement[0].element?.$context.raw;
                            navigate('/details', {
                                state: pointData,
                            });
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
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
