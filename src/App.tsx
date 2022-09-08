import React, { useEffect } from 'react'
import { Dashboard } from 'components/Dashboard'
import { Filters } from 'components/Filters'
import { Header } from 'components/Header'
import { getLessonsData } from 'reducers/lessons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { Routes, Route } from 'react-router-dom'
import { Details } from 'components/Details'
import ClipLoader from 'react-spinners/ClipLoader'
import { StateTypes } from 'types'
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
  const { isLoading } = useSelector((state: StateTypes) => state.lessons)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getLessonsData())
  }, [])

  return (
    <main className='container'>
      {isLoading && (
        <div className='loading__container'>
          <ClipLoader loading={isLoading} color='purple' size={70} />
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
