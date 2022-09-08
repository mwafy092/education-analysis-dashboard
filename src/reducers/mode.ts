import { createSlice } from '@reduxjs/toolkit'

export type InitialStateType = {
  darkMode: false | true
}

const initialState: InitialStateType = {
  darkMode: false,
}

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setDarkMode: (state: InitialStateType) => {
      state.darkMode = !state.darkMode
    },
  },
})

export const { setDarkMode } = modeSlice.actions
export default modeSlice.reducer
