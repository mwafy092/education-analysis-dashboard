import { Filters } from '../../src/components/Filters'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import { BrowserRouter } from 'react-router-dom'

describe('Test filters component', () => {
  it('Playground', () => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Filters />
        </BrowserRouter>
      </Provider>,
    )
  })
})
