import React, { FC, useEffect, useState } from 'react';
import '../styles/chart-data.css';
import { useSelector, useDispatch } from 'react-redux';
import { addDataToChart } from '../reducers/lessons';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const ChartData: FC = () => {
    const [colors, setColors] = useState<any>({});
    const [totalLessons, setTotalLessons] = useState<number>(0);
    const [schoolsData, setSchoolsData] = useState<any>([]);
    const [selectedInput, setSelectedInput] = useState<any>([]);
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

    const handleRadioButton = (item: any) => {
        if (selectedInput.includes(item)) {
            let index = selectedInput.indexOf(item);
            let arrayCopy = [...selectedInput];
            arrayCopy.splice(index, 1);
            setSelectedInput(arrayCopy);
        } else {
            setSelectedInput((prevState: any) => [...prevState, item]);
        }
    };

    useEffect(() => {
        setSelectedInput([]);
    }, [camp]);
    useEffect(() => {
        const chartColors = ['orange', 'purple', 'skyblue', 'red'];
        const chartDataWithColors: any = [];
        selectedInput.forEach((item: any, index: number) =>
            chartDataWithColors.push({ [item]: chartColors[index] })
        );
        dispatch(addDataToChart(chartDataWithColors));
    }, [selectedInput, dispatch]);
    // useEffect for running functions
    useEffect(() => {
        getTotalLessonsForCamp(lessonsData, country, camp);
    }, [lessonsData, country, camp]);
    useEffect(() => {
        getLessonsPerSchool(lessonsData, country, camp, school);
    }, [lessonsData, country, camp, school]);
    useEffect(() => {
        let colorsObject: any = {};
        chartData.forEach((color: any) => {
            colorsObject = { ...colorsObject, ...color };
        });
        setColors(colorsObject);
    }, [chartData]);

    if (!camp) {
        return (
            <div className='chart__data__container'>
                <div className='schools__data__container'>
                    <p className='empty__state'>No Data To Display</p>
                </div>
            </div>
        );
    }
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
                        id={item}
                        style={{
                            color: colors[item] || 'gray',
                        }}
                    >
                        {schoolsData[item] && (
                            <RadioButtonCheckedIcon
                                style={{ width: '20px', cursor: 'pointer' }}
                                onClick={(e) => {
                                    handleRadioButton(item);
                                }}
                            />
                        )}

                        {schoolsData[item] && (
                            <div className='school__info'>
                                <h3>
                                    <span className='lesson__num'>
                                        {schoolsData[item]}
                                    </span>{' '}
                                    lessons
                                </h3>
                                <p>in {item}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { ChartData };
