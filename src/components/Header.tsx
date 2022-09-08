import React, { FC } from 'react'
import '../styles/header.css'
import chartIcon from '../assets/chart.png'
const Header: FC = () => {
  return (
    <header className='header__container' role='contentinfo'>
      <h1>
        Analysis Chart
        <img src={chartIcon} alt='chart icon' width={30} />
      </h1>
      <h2>Number of lessons</h2>
    </header>
  )
}

export { Header }
