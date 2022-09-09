import { Details } from '../../src/components/Details'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import { BrowserRouter } from 'react-router-dom'

describe('Header.cy.ts', () => {
  it('playground', () => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </Provider>,
    )
    cy.contains(/Go Back To Home Page/)
      .should('be.visible')
      .should('have.attr', 'href')
  })
})
