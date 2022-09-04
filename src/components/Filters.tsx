import React, { FC, useEffect, useState } from 'react';
import '../styles/filters.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLocationDataAction } from '../reducers/lessons';
const Filters: FC = () => {
    const dispatch = useDispatch();
    const [countries, setCountries] = useState<any>([]);
    const [camps, setCamps] = useState<any>([]);
    const [schools, setSchools] = useState<any>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCamp, setSelectedCamp] = useState<string>('');
    const [selectedSchool, setSelectedSchool] = useState<string>('');
    const [savedData, setSavedData] = useState<any>({});
    const { lessonsData, country, camp, school } = useSelector(
        (store: { lessons: any }) => store.lessons
    );

    // Selectors to select data from the store
    const getCountries = (data: []) => {
        let newDataArray = data.map((item: any) => item.country);
        let dataSet = new Set(newDataArray);
        return Array.from(dataSet);
    };

    const getCampsBasedOnCountry = (data: any, country: string) => {
        let campData: any = [];
        let campsArray = data.filter((item: any) => item.country === country);
        campsArray.forEach((camp: any) => campData.push(camp.camp));
        const campDataSet = new Set(campData);
        return Array.from(campDataSet);
    };

    const getSchoolsBasedOnCamp = (
        data: any,
        camp: string,
        country: string
    ) => {
        const schoolData: any = ['Show All'];
        let schoolsData = data.filter(
            (item: any) => item.camp === camp && item.country === country
        );
        schoolsData.forEach((school: any) => schoolData.push(school.school));
        const schoolDataSet = new Set(schoolData);
        return Array.from(schoolDataSet);
    };

    // use effect section for fetching data from store
    useEffect(() => {
        let fetchedCountries = getCountries(lessonsData);
        setCountries(fetchedCountries);
    }, [lessonsData]);
    useEffect(() => {
        let fetchedCamps = getCampsBasedOnCountry(
            lessonsData,
            selectedCountry || savedData.country
        );
        setCamps(fetchedCamps);
    }, [lessonsData, selectedCountry, savedData]);

    useEffect(() => {
        let fetchedSchools = getSchoolsBasedOnCamp(
            lessonsData,
            selectedCamp || savedData.camp,
            selectedCountry || savedData.country
        );
        setSchools(fetchedSchools);
        const countryItem = selectedCountry || savedData.country;
        const campItem = selectedCamp || savedData.camp;
        const schoolItem = selectedSchool || savedData.school;
        dispatch(
            setLocationDataAction({
                countryItem,
                campItem,
                schoolItem,
            })
        );
    }, [lessonsData, selectedCamp, selectedCountry, selectedSchool, savedData]);

    useEffect(() => {
        if (camp || country || school) {
            localStorage.setItem(
                'savedFilteredData',
                JSON.stringify({ country, camp, school })
            );
        }
    }, [camp, country, school]);

    useEffect(() => {
        let savedData: any = localStorage?.getItem('savedFilteredData');
        let parsedData = JSON.parse(savedData);
        setSavedData(parsedData);
    }, []);

    return (
        <section className='filters__container'>
            <div className='filter'>
                <label htmlFor='country'>Select Country</label>
                <select
                    id='country'
                    onChange={(e) => {
                        setSelectedCountry(e.target.value);
                    }}
                >
                    <option value='null'>Select Country</option>
                    {countries?.map((country: string) => {
                        if (country === savedData.country) {
                            return (
                                <option
                                    value={savedData.country}
                                    selected
                                >
                                    {savedData.country}
                                </option>
                            );
                        } else {
                            return (
                                <option
                                    id={country}
                                    value={country}
                                    key={country}
                                >
                                    {country}
                                </option>
                            );
                        }
                    })}
                </select>
            </div>
            <div className='filter'>
                <label htmlFor='camp'>Select Camp</label>
                <select
                    id='camp'
                    onChange={(e) => {
                        setSelectedCamp(e.target.value);
                    }}
                >
                    <option value={'null'}>Select Camp</option>
                    {camps?.map((camp: string) => {
                        if (camp === savedData.camp) {
                            return (
                                <option
                                    value={savedData.camp}
                                    selected
                                >
                                    {savedData.camp}
                                </option>
                            );
                        } else {
                            return (
                                <option
                                    id={camp}
                                    value={camp}
                                    key={camp}
                                >
                                    {camp}
                                </option>
                            );
                        }
                    })}
                </select>
            </div>
            <div className='filter'>
                <label htmlFor='school'>Select School</label>
                <select
                    id='school'
                    onChange={(e) => {
                        setSelectedSchool(e.target.value);
                    }}
                >
                    <option>Select School</option>
                    {schools?.map((school: string) => {
                        if (school === savedData.school) {
                            return (
                                <option
                                    value={savedData.school}
                                    selected
                                >
                                    {savedData.school}
                                </option>
                            );
                        } else {
                            return (
                                <option
                                    id={school}
                                    value={school}
                                    key={school}
                                >
                                    {school}
                                </option>
                            );
                        }
                    })}
                </select>
            </div>
        </section>
    );
};

export { Filters };
