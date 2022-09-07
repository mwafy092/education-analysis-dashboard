import React, { FC, useEffect, useState } from 'react';
import '../styles/chart-data.css';
import { useSelector, useDispatch } from 'react-redux';
import { addDataToChartAction } from '../reducers/lessons';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Lessons, StateTypes, lessonsDataTypes } from '../reducers/types';
import { getSchoolsDataByCountryAndCamp } from '../utils/selectors';
const ChartData: FC = () => {
    const [colors, setColors] = useState<any>({});
    const [totalLessons, setTotalLessons] = useState<number>(0);
    const [schoolsData, setSchoolsData] = useState<any>([]);
    const [selectedInput, setSelectedInput] = useState<string[]>([]);
    const [topSchool, setTopSchool] = useState<any>({});
    const dispatch = useDispatch();
    const { country, camp, school, chartData, educationData } = useSelector(
        (store: StateTypes) => store.lessons
    );

    const handleRadioButton = (item: string) => {
        if (selectedInput.includes(item)) {
            let index = selectedInput.indexOf(item);
            let arrayCopy = [...selectedInput];
            arrayCopy.splice(index, 1);
            setSelectedInput(arrayCopy);
        } else {
            setSelectedInput((prevState: typeof selectedInput) => [
                ...prevState,
                item,
            ]);
        }
    };

    useEffect(() => {
        setSelectedInput([]);
    }, [camp]);

    useEffect(() => {
        let topSchoolByLessons = { lessons: 0, school: '' };
        for (let item of Object.keys(schoolsData)) {
            topSchoolByLessons =
                topSchoolByLessons.lessons < schoolsData[item]
                    ? { lessons: schoolsData[item], school: item }
                    : topSchoolByLessons;
        }
        setSelectedInput([topSchoolByLessons.school]);
        setTopSchool(topSchoolByLessons);
    }, [schoolsData]);

    useEffect(() => {
        const chartColors = ['orange', 'purple', 'skyblue', 'red'];
        const chartDataWithColors: any = [];
        selectedInput.forEach((item: any, index: number) =>
            chartDataWithColors.push({ [item]: chartColors[index] })
        );
        dispatch(addDataToChartAction(chartDataWithColors));
    }, [selectedInput, dispatch]);
    // useEffect for running functions
    useEffect(() => {
        let totalLessons = 0;
        for (let item of Object.keys(schoolsData)) {
            totalLessons += schoolsData[item];
        }
        setTotalLessons(totalLessons);
    }, [country, camp, schoolsData]);

    useEffect(() => {
        let schoolsArray = getSchoolsDataByCountryAndCamp(
            educationData,
            country,
            camp
        );

        let lessonsData: lessonsDataTypes[] = [];
        schoolsArray.forEach((sc: Lessons) => {
            lessonsData.push({ school: sc.school, lessons: sc.lessons });
        });

        let computedLessonsData: any = {};
        lessonsData.forEach((ld: lessonsDataTypes) => {
            if (ld.school in computedLessonsData) {
                computedLessonsData[`${ld.school}`] += ld.lessons;
            } else {
                computedLessonsData[`${ld.school}`] = ld.lessons;
            }
        });

        if (school?.toLowerCase() === 'show all') {
            setSchoolsData(computedLessonsData);
        } else {
            setSchoolsData({
                [`${school}`]: computedLessonsData[school],
            });
        }
    }, [educationData, country, camp, school]);

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
                    <p className='empty__state'>
                        Please select country, camp and school to view data
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className='chart__data__container'>
            {totalLessons ? (
                <div className='top__school__label'>
                    {Object.keys(schoolsData).length > 1 ? (
                        <div>
                            <span>{topSchool.school}</span> is the top school
                            with total <span>{topSchool.lessons}</span> lessons
                        </div>
                    ) : (
                        <div>
                            <span>{topSchool.school}</span> has{' '}
                            <span>{topSchool.lessons}</span> lessons
                        </div>
                    )}
                </div>
            ) : null}
            {totalLessons ? (
                <div className='total__schools__data'>
                    <h2>
                        <span className='total__lessons__num'>
                            {totalLessons}
                        </span>{' '}
                        lessons
                    </h2>
                    <p>in {camp}</p>
                </div>
            ) : (
                <div className='chart__data__container'>
                    <div className='schools__data__container'>
                        <p className='empty__state'>Please select school</p>
                    </div>
                </div>
            )}

            <div className='schools__data__container'>
                {Object.keys(schoolsData).map((item: string, index: number) => (
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
