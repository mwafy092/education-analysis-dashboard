import React, { useEffect, useState } from 'react'
import { Dashboard } from 'components/Dashboard'
import { Filters } from 'components/Filters'
import { Header } from 'components/Header'
import { getLessonsData, setLocationDataByVoiceAction } from 'reducers/lessons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { Routes, Route } from 'react-router-dom'
import { Details } from 'components/Details'
import ClipLoader from 'react-spinners/ClipLoader'
import { StateTypes } from 'types'
import alanBtn from '@alan-ai/alan-sdk-web'
import closeBtn from 'assets/close.png'
const Home = () => {
  return (
    <>
      <Header />
      <Filters />
      <Dashboard />
    </>
  )
}
const App = () => {
  const [countryByVoice, setCountryByVoice] = useState('')
  const [campByVoice, setCampByVoice] = useState('')
  const [showPop, setShowPop] = useState(true)
  const { isLoading } = useSelector((state: StateTypes) => state.lessons)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getLessonsData())
  }, [])

  useEffect(() => {
    alanBtn({
      key: '8e077b5c977f6a0dc2ff9885945c8c972e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData: any) => {
        if (commandData.command === 'getCountry') {
          setCountryByVoice(commandData.country)
        }
        if (commandData.command === 'getCamp') {
          setCampByVoice(commandData.camp)
        }
      },
    })
  }, [])

  useEffect(() => {
    dispatch(setLocationDataByVoiceAction({ countryItem: countryByVoice, campItem: campByVoice }))
  }, [countryByVoice, campByVoice])

  return (
    <main className='container'>
      {isLoading && (
        <div className='loading__container'>
          <ClipLoader loading={isLoading} color='purple' size={70} />
        </div>
      )}
      {showPop && (
        <div className='popup__container'>
          <img
            src={closeBtn}
            alt='close btn'
            width={30}
            onClick={() => {
              setShowPop(false)
            }}
          />
          <p>Now you can use your voice to select countries and camps!</p>
          <p>
            Just try <i>Select country</i> or <i>how many camps</i> orders
          </p>
        </div>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
      </Routes>
    </main>
  )
}

export default App
