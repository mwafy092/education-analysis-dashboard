import React, { FC, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/chart.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Lessons, StateTypes } from '../reducers/types';
const Chart: FC = () => {
    const navigate = useNavigate();
    const [colors, setColors] = useState<any>({});
    const [lineChartData, setLineChartData] = useState<Lessons[]>([]);
    const { chartData, lessonsData, country, camp } = useSelector(
        (state: StateTypes) => state.lessons
    );

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
    const getSchoolsDataSelector = (): Lessons[] => {
        const schoolsPerCamp = lessonsData.filter(
            (lData: Lessons) => lData.country === country && lData.camp === camp
        );

        let months = [
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
        schoolsPerCamp.sort((a: Lessons, b: Lessons) => {
            return months.indexOf(a.month) - months.indexOf(b.month);
        });
        const chartDataSet: Lessons[] = [];
        schoolsPerCamp.forEach((item: Lessons) =>
            chartDataSet.push({ ...item })
        );
        function splitArray(arr: Lessons[], property: string) {
            return arr.reduce(function (memo: any, x: any) {
                if (!memo[x[property]]) {
                    memo[x[property]] = [];
                }

                memo[x[property]].push(x);
                return memo;
            }, {});
        }
        let sectionedData = splitArray(chartDataSet, 'school');
        let __CHART__DATA: Lessons[] = [];
        for (let i of chartData) {
            let key = Object.keys(i)[0];

            __CHART__DATA.push(sectionedData[key]);
        }
        return __CHART__DATA;
    };

    useEffect(() => {
        let colorsObject: any = {};
        chartData.forEach((color: any) => {
            colorsObject = { ...colorsObject, ...color };
        });
        setColors(colorsObject);
    }, [chartData]);

    useEffect(() => {
        getSchoolsDataSelector();
        setLineChartData(getSchoolsDataSelector());
    }, [lessonsData, country, camp, chartData]);

    return (
        <div className='chart__container'>
            <h3>No of lessons</h3>
            <div className='chart'>
                <Line
                    role='linechart'
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
