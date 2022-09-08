import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Details } from '../components/Details'
import { BrowserRouter } from 'react-router-dom'
test('check for react router link', () => {
  render(
    <BrowserRouter>
      <Details />
    </BrowserRouter>,
  )
  const linkElement = screen.getByRole('link')
  fireEvent.click(linkElement)
  expect(linkElement).toHaveAttribute('href', '/')
})
