import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '../components/Header'
test('header main title test', () => {
  render(<Header />)
  const headerElement = screen.getByText(/Analysis Chart/i)
  expect(headerElement).toBeInTheDocument()
})
test('header secondary title test', () => {
  render(<Header />)
  const headerElement = screen.getByRole('contentinfo')
  expect(headerElement).toHaveTextContent('Number of lessons')
  expect(headerElement).toHaveAttribute('role', 'contentinfo')
})
