import React, { FC, useEffect, useState } from 'react';
import '../styles/filters.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLocationDataAction } from '../reducers/lessons';
import { StateTypes } from '../reducers/types';
const Filters: FC = () => {
    const dispatch = useDispatch();
    const [countries, setCountries] = useState<string[]>([]);
    const [camps, setCamps] = useState<string[]>([]);
    const [schools, setSchools] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCamp, setSelectedCamp] = useState<string>('');
    const [selectedSchool, setSelectedSchool] = useState<string>('');
    const [savedData, setSavedData] = useState<any>({});
    const { country, camp, school, educationData } = useSelector(
        (store: StateTypes) => store.lessons
    );

    // use effect section for fetching data from store
    useEffect(() => {
        let countries = [];
        for (let item in educationData) {
            countries.push(item);
        }
        setCountries(countries);
    }, [educationData]);
    useEffect(() => {
        let campsPerCountry =
            educationData[selectedCountry || savedData?.country];
        setCamps(campsPerCountry && Object.keys(campsPerCountry));
    }, [educationData, selectedCountry, savedData]);

    useEffect(() => {
        let schoolsPerCamp =
            educationData?.[selectedCountry || savedData?.country]?.[
                selectedCamp || savedData?.camp
            ];
        setSchools(
            schoolsPerCamp && ['Show All', ...Object.keys(schoolsPerCamp)]
        );
        const countryItem = selectedCountry || savedData?.country;
        const campItem = selectedCamp || savedData?.camp;
        const schoolItem = selectedSchool || savedData?.school;
        dispatch(
            setLocationDataAction({
                countryItem,
                campItem,
                schoolItem,
            })
        );
    }, [
        educationData,
        dispatch,
        savedData,
        selectedCamp,
        selectedCountry,
        selectedSchool,
    ]);

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
                        if (country === savedData?.country) {
                            return (
                                <option
                                    value={savedData?.country}
                                    selected
                                >
                                    {savedData?.country}
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
                        if (camp === savedData?.camp) {
                            return (
                                <option
                                    value={savedData?.camp}
                                    selected
                                >
                                    {savedData?.camp}
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
                        if (school === savedData?.school) {
                            return (
                                <option
                                    value={savedData?.school}
                                    selected
                                >
                                    {savedData?.school}
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
