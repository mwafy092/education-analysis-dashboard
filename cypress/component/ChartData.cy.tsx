import { ChartData } from '../../src/components/ChartData'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import { BrowserRouter } from 'react-router-dom'
import { getLessonsData, setLocationDataAction } from '../../src/reducers/lessons'

describe('Header.cy.ts', () => {
  it('playground', () => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ChartData />
        </BrowserRouter>
      </Provider>,
    )
    // test dispatch store with certain data
    cy.window()
      .its('store')
      .then((state) => {
        store.dispatch(getLessonsData())
        store.dispatch(
          setLocationDataAction({
            countryItem: 'Egypt',
            campItem: 'Omaka',
            schoolItem: 'Show All',
          }),
        )
      })
  })
})
