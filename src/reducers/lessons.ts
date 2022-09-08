import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getSlicedDataForStore } from '../utils/selectors'
import { ColorsInterface, EducationData } from '../types'
export type Lessons = {
  id: string
  month: string
  camp: string
  country: string
  school: string
  lessons: number
}

export type InitialStateType = {
  isLoading: false | true
  country: string
  camp: string
  school: string
  chartData: ColorsInterface[]
  educationData: EducationData
}

const initialState: InitialStateType = {
  isLoading: true,
  country: '',
  camp: '',
  school: '',
  chartData: [],
  educationData: {},
}

// thunk configuration
const apiURL =
  'https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json'

export const getLessonsData = createAsyncThunk('lessons/getLessonsData', () => {
  return fetch(apiURL)
    .then((res) => res.json())
    .catch((err) => console.error(err))
})

type ChartDataAction = {
  type: string
  payload: ColorsInterface[]
}
type LocationData = {
  countryItem: string
  campItem: string
  schoolItem: string
}
type LocationDataAction = {
  type: string
  payload: LocationData
}
const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setLocationDataAction: (state: InitialStateType, action: LocationDataAction) => {
      state.country = action.payload.countryItem
      state.camp = action.payload.campItem
      state.school = action.payload.schoolItem
    },
    addDataToChartAction: (state: InitialStateType, action: ChartDataAction) => {
      state.chartData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLessonsData.pending, (state: InitialStateType) => {
      state.isLoading = true
    })
    builder.addCase(getLessonsData.fulfilled, (state: InitialStateType, action: PayloadAction) => {
      state.educationData = getSlicedDataForStore(action.payload)
      state.isLoading = false
    })
    builder.addCase(getLessonsData.rejected, (state: InitialStateType) => {
      state.isLoading = false
    })
  },
})

export const { setLocationDataAction, addDataToChartAction } = lessonsSlice.actions

export default lessonsSlice.reducer
