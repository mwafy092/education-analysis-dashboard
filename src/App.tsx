import React from 'react';
import { Filters } from './components/Filters';
import { Header } from './components/Header';
const App = () => {
    return (
        <main className='container'>
            <Header />
            <Filters />
        </main>
    );
};

export default App;
