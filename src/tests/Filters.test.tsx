import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Filters } from '../components/Filters';
import { Provider } from 'react-redux';
import { store } from '../store';

test('get country', () => {
    render(
        <Provider store={store}>
            <Filters />
        </Provider>
    );
    const onChangeButton = screen.getByRole('countryonchange');
    fireEvent.change(onChangeButton);
    expect(onChangeButton).toBeInTheDocument();
});
