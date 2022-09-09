import React, { FC, useState, useEffect } from 'react'
import 'styles/header.css'
import chartIcon from 'assets/chart.png'
import { useSelector, useDispatch } from 'react-redux'
import { StateTypes } from 'types'
import { InitialStateType, setDarkMode } from 'reducers/mode'
import darkIcon from 'assets/dark.png'
import lightIcon from 'assets/light.png'
const Header: FC = () => {
  const [darkModeState, setDarkModeState] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { darkMode } = useSelector(
    (state: { mode: InitialStateType; lessons: StateTypes }) => state?.mode,
  )
  useEffect(() => {
    setDarkModeState(darkMode)
  }, [darkMode])
  useEffect(() => {
    document.body.style.backgroundColor = darkModeState ? '#000' : '#fff'
  }, [darkModeState])
  return (
    <header className='header__container' role='contentinfo'>
      <div>
        <h1>
          Analysis Chart
          <img src={chartIcon} alt='chart icon' width={30} />
        </h1>
        <h2>Number of lessons</h2>
      </div>
      <div className='dark__mode__switcher'>
        <img
          src={darkModeState ? lightIcon : darkIcon}
          alt='mode icon'
          className='mode__switcher'
          id='modeSwitcher'
          onClick={() => {
            dispatch(setDarkMode())
          }}
        />
      </div>
    </header>
  )
}

export { Header }
