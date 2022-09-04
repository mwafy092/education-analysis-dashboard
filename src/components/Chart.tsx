import React, { FC, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/chart.css';
import { useSelector } from 'react-redux';
const Chart: FC = () => {
    const [colors, setColors] = useState<any>({});
    const [lineChartData, setLineChartData] = useState<any>([]);
    const { chartData, lessonsData, country, camp } = useSelector(
        (state: any) => state.lessons
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
    const getSchoolsDataSelector = () => {
        const schoolsPerCamp = lessonsData.filter(
            (lData: any) => lData.country === country && lData.camp === camp
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
        schoolsPerCamp.sort((a: any, b: any) => {
            return months.indexOf(a.month) - months.indexOf(b.month);
        });
        const chartDataSet: any = [];
        schoolsPerCamp.forEach((item: any) => chartDataSet.push({ ...item }));
        function splitArray(arr: any, property: any) {
            return arr.reduce(function (memo: any, x: any) {
                if (!memo[x[property]]) {
                    memo[x[property]] = [];
                }

                memo[x[property]].push(x);
                return memo;
            }, {});
        }
        let sectionedData = splitArray(chartDataSet, 'school');
        let __CHART__DATA: any = [];
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
