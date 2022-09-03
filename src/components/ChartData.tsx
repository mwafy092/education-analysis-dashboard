import React, { FC, useEffect, useState } from 'react';
import '../styles/chart-data.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSchoolData } from '../reducers/lessons';

const ChartData: FC = () => {
    const [totalLessons, setTotalLessons] = useState<number>(0);
    const [schoolsData, setSchoolsData] = useState<any>([]);
    const dispatch = useDispatch();
    const { lessonsData, country, camp, school, chartData } = useSelector(
        (store: any) => store.lessons
    );
    // get total lessons for each camp
    const getTotalLessonsForCamp = (
        data: any,
        country: string,
        camp: string
    ) => {
        let totalLessons = 0;
        let lessonsDataArray = data.filter(
            (item: any) => item.country === country && item.camp === camp
        );
        lessonsDataArray.forEach((lesson: any) => {
            totalLessons += lesson.lessons;
        });
        setTotalLessons(totalLessons);
    };

    // get computed lessons for each school
    const getLessonsPerSchool = (
        data: any,
        country: string,
        camp: string,
        school: string
    ) => {
        let schoolsArray = data.filter(
            (item: any) => item.country === country && item.camp === camp
        );
        let lessonsData: any = [];
        schoolsArray.forEach((sc: any) => {
            lessonsData.push({ school: sc.school, lessons: sc.lessons });
        });
        let computedLessonsData: any = {};
        lessonsData.forEach((ld: any) => {
            if (ld.school in computedLessonsData) {
                computedLessonsData[`${ld.school}`] += ld.lessons;
            } else {
                computedLessonsData[`${ld.school}`] = ld.lessons;
            }
        });

        if (school.toLowerCase() === 'show all') {
            setSchoolsData(computedLessonsData);
        } else {
            setSchoolsData({
                [`${school}`]: computedLessonsData[school],
            });
        }
    };

    const handleRadioButton = (item: any, color: string) => {
        let data = lessonsData.filter(
            (ld: any) =>
                ld.school === item && ld.country === country && ld.camp === camp
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
        data.sort((a: any, b: any) => {
            console.log(a);
            return months.indexOf(a.month) - months.indexOf(b.month);
        });
        const chartDataSet: any = [];
        data.forEach((item: any) => chartDataSet.push({ ...item, color }));
        dispatch(setSelectedSchoolData(chartDataSet));
    };

    // useEffect for running functions
    useEffect(() => {
        getTotalLessonsForCamp(lessonsData, country, camp);
    }, [lessonsData, country, camp]);
    useEffect(() => {
        getLessonsPerSchool(lessonsData, country, camp, school);
    }, [lessonsData, country, camp, school]);

    // colors array
    const chartColors = ['orange', 'purple', 'skyblue', 'red'];
    return (
        <div className='chart__data__container'>
            <div className='total__schools__data'>
                <h2>
                    <span className='total__lessons__num'>{totalLessons}</span>{' '}
                    lessons
                </h2>
                <p>in {camp}</p>
            </div>
            <div className='schools__data__container'>
                {Object.keys(schoolsData).map((item: any, index: number) => (
                    <div
                        className='school__data'
                        key={item}
                        style={{ color: `${chartColors[index]}` }}
                    >
                        <input
                            type='radio'
                            onClick={() => {
                                handleRadioButton(item, chartColors[index]);
                            }}
                        />
                        <div className='school__info'>
                            <h3>
                                <span className='lesson__num'>
                                    {schoolsData[item]}
                                </span>{' '}
                                lessons
                            </h3>
                            <p>in {item}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { ChartData };
