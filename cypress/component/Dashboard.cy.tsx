import { Dashboard } from '../../src/components/Dashboard'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import { BrowserRouter } from 'react-router-dom'

describe('Header.cy.ts', () => {
  it('playground', () => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>,
    )
    cy.contains(/Please select country, camp and school to view data/).should('be.visible')
  })
})
