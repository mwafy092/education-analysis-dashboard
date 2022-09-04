import React, { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Filters } from './components/Filters';
import { Header } from './components/Header';
import { getLessonsData } from './reducers/lessons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { Routes, Route, Link } from 'react-router-dom';
import { Details } from './components/Details';
const Home = () => {
    return (
        <>
            <Header />
            <Filters />
            <Dashboard />
        </>
    );
};
const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getLessonsData());
    }, []);

    return (
        <main className='container'>
            <Routes>
                <Route
                    path='/'
                    element={<Home />}
                />
                <Route
                    path='/details'
                    element={<Details />}
                />
            </Routes>
        </main>
    );
};

export default App;
