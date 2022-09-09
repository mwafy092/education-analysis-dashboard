import { Filters } from '../../src/components/Filters'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import { BrowserRouter } from 'react-router-dom'
import { getLessonsData, setLocationDataAction } from '../../src/reducers/lessons'

describe('Test filters component', () => {
  it('Playground', () => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Filters />
        </BrowserRouter>
      </Provider>,
    )
    cy.window()
      .its('store')
      .then((state) => {
        store.dispatch(getLessonsData())
      })

    // check for country list after dispatching
    cy.get('#country').contains('Select Country')
    cy.get('#Egypt').contains('Egypt')
    cy.wait(2000)
    cy.get('#country').select('Egypt')
  })
})
