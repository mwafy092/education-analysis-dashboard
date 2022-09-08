import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialStateType = {
  darkMode: false | true
}

const initialState: InitialStateType = {
  darkMode: false,
}

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {},
})

export default modeSlice.reducer
