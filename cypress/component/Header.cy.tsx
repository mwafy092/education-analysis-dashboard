import { Header } from '../../src/components/Header'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
describe('Header.cy.ts', () => {
  it('playground', () => {
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>,
    )
    cy.contains(/Analysis Chart/).should('be.visible')
    cy.contains(/Number of lessons/).should('be.visible')
  })
})
