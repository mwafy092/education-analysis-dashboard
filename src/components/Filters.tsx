import React, { FC, useEffect, useState } from 'react'
import 'styles/filters.css'
import { useSelector, useDispatch } from 'react-redux'
import { setLocationDataAction } from 'reducers/lessons'
import { SavedData, StateTypes } from 'types'
const Filters: FC = () => {
  const dispatch = useDispatch()
  const [countries, setCountries] = useState<string[]>([])
  const [camps, setCamps] = useState<string[]>([])
  const [schools, setSchools] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedCamp, setSelectedCamp] = useState<string>('')
  const [selectedSchool, setSelectedSchool] = useState<string>('')
  const [savedData, setSavedData] = useState<SavedData>()
  const { country, camp, school, educationData, countryByVoice, campByVoice } = useSelector(
    (store: StateTypes) => store.lessons,
  )

  // set default school before any interaction
  useEffect(() => {
    if (localStorage.getItem('savedFilteredData') === null) {
      setSelectedSchool('Show All')
    }
  }, [])

  // use effect section for fetching data from store
  useEffect(() => {
    const countries = []
    for (const item in educationData) {
      countries.push(item)
    }
    setCountries(countries)
  }, [educationData])
  useEffect(() => {
    const campsPerCountry =
      educationData[selectedCountry || countryByVoice || savedData?.country || '']
    setCamps(campsPerCountry && Object.keys(campsPerCountry))
  }, [educationData, selectedCountry, savedData, countryByVoice])

  useEffect(() => {
    const schoolsPerCamp =
      educationData?.[selectedCountry || countryByVoice || savedData?.country || '']?.[
        selectedCamp || savedData?.camp || ''
      ]
    setSchools(schoolsPerCamp && ['Show All', ...Object.keys(schoolsPerCamp)])
    const countryItem = selectedCountry || countryByVoice || savedData?.country
    const campItem = selectedCamp || campByVoice || savedData?.camp
    const schoolItem = selectedSchool || savedData?.school
    if (countryItem && campItem && schoolItem) {
      dispatch(
        setLocationDataAction({
          countryItem,
          campItem,
          schoolItem,
        }),
      )
    }
  }, [
    educationData,
    dispatch,
    savedData,
    selectedCamp,
    selectedCountry,
    selectedSchool,
    countryByVoice,
    campByVoice,
  ])

  useEffect(() => {
    if (camp || country || school) {
      localStorage.setItem('savedFilteredData', JSON.stringify({ country, camp, school }))
    }
  }, [camp, country, school])

  useEffect(() => {
    const savedData: string | null = localStorage?.getItem('savedFilteredData')
    let parsedData: { country: string; camp: string; school: string } = {
      country: '',
      camp: '',
      school: '',
    }
    if (savedData) {
      parsedData = JSON.parse(savedData)
    }
    setSavedData(parsedData)
  }, [])

  return (
    <section className='filters__container'>
      <div className='filter'>
        <label htmlFor='country'>Select Country</label>
        <select
          id='country'
          onChange={(e) => {
            setSelectedCountry(e.target.value)
          }}
        >
          <option value='null'>Select Country</option>
          {countries?.map((country: string) => {
            if (country === savedData?.country) {
              return (
                <option key={country} value={savedData?.country} selected>
                  {savedData?.country}
                </option>
              )
            } else if (country === countryByVoice) {
              return (
                <option key={country} value={countryByVoice} selected>
                  {countryByVoice}
                </option>
              )
            } else {
              return (
                <option id={country} value={country} key={country}>
                  {country}
                </option>
              )
            }
          })}
        </select>
      </div>
      <div className='filter'>
        <label htmlFor='camp'>Select Camp</label>
        <select
          id='camp'
          onChange={(e) => {
            setSelectedCamp(e.target.value)
          }}
        >
          <option value={'null'}>Select Camp</option>
          {camps?.map((camp: string) => {
            if (camp === savedData?.camp) {
              return (
                <option key={camp} value={savedData?.camp} selected>
                  {savedData?.camp}
                </option>
              )
            } else if (camp === campByVoice) {
              return (
                <option key={camp} value={campByVoice} selected>
                  {campByVoice}
                </option>
              )
            } else {
              return (
                <option id={camp} value={camp} key={camp}>
                  {camp}
                </option>
              )
            }
          })}
        </select>
      </div>
      <div className='filter'>
        <label htmlFor='school'>Select School</label>
        <select
          id='school'
          onChange={(e) => {
            setSelectedSchool(e.target.value)
          }}
        >
          <option>Select School</option>
          {schools?.map((school: string) => {
            if (school === savedData?.school) {
              return (
                <option key={school} value={savedData?.school} selected>
                  {savedData?.school}
                </option>
              )
            } else {
              return (
                <option id={school} value={school} key={school}>
                  {school}
                </option>
              )
            }
          })}
        </select>
      </div>
    </section>
  )
}

export { Filters }
