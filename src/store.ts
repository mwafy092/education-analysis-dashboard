import { configureStore } from '@reduxjs/toolkit'
import lessonsReducer from 'reducers/lessons'
import modeReducer from 'reducers/mode'

const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
    mode: modeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

declare global {
  interface Window {
    store: typeof store
    Cypress: any
  }
}
if (window.Cypress) {
  window.store = store
}
export { store }
