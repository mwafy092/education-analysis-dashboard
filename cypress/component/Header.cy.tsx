import { Header } from '../../src/components/Header'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
describe('Test header component', () => {
  it('Playground', () => {
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>,
    )
    cy.contains(/Analysis Chart/).should('be.visible')
    cy.contains(/Number of lessons/).should('be.visible')
    // testing dark mode
    cy.get('#modeSwitcher').click()
    cy.wait(1000)
    cy.get('#modeSwitcher').click()
  })
})
