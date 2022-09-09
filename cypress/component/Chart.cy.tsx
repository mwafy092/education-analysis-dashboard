import { Chart } from '../../src/components/Chart'
import { Provider } from 'react-redux'
import { store } from '../../src/store'
import { BrowserRouter } from 'react-router-dom'
import {
  getLessonsData,
  setLocationDataAction,
  addDataToChartAction,
} from '../../src/reducers/lessons'

describe('Test chart component', () => {
  it('playground', () => {
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Chart />
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
        store.dispatch(
          setLocationDataAction({
            countryItem: 'Egypt',
            campItem: 'Kakuma',
            schoolItem: 'Show All',
          }),
        )
        // dispatch data to view chart line
        store.dispatch(
          addDataToChartAction([
            {
              Greenlight: 'orange',
            },
          ]),
        )
      })

    // check on console the action we dispatched and the data we got
    cy.wait(2000)
    cy.window()
      .its('store')
      .invoke('getState')
      .then((state) => {
        console.log(state)
      })
  })
})
