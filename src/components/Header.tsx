import React, { FC } from 'react';
import '../styles/header.css';
const Header: FC = () => {
    return (
        <header
            className='header__container'
            role='contentinfo'
        >
            <h1>Analysis Chart</h1>
            <h2>Number of lessons</h2>
        </header>
    );
};

export { Header };
