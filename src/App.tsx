import React, { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Filters } from './components/Filters';
import { Header } from './components/Header';
import { getLessonsData } from './reducers/lessons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getLessonsData());
    }, []);
    const store = useSelector((state) => state);
    console.log(store);
    return (
        <main className='container'>
            <Header />
            <Filters />
            <Dashboard />
        </main>
    );
};

export default App;
