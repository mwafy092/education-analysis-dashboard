import React, { FC } from 'react';
import '../styles/header.css';
const Header: FC = () => {
    return (
        <header className='header__container'>
            <h1>Analysis Chart</h1>
            <h2>Number of sessons</h2>
        </header>
    );
};

export { Header };
