import React from 'react';
import { Dashboard } from './components/Dashboard';
import { Filters } from './components/Filters';
import { Header } from './components/Header';
const App = () => {
    return (
        <main className='container'>
            <Header />
            <Filters />
            <Dashboard />
        </main>
    );
};

export default App;
