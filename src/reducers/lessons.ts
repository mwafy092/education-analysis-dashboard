import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getSlicedDataForStore } from '../utils/selectors';
export type Lessons = {
    id: string;
    month: string;
    camp: string;
    country: string;
    school: string;
    lessons: number;
};

export type InitialStateType = {
    lessonsData: Lessons[];
    isLoading: false | true;
    country: string;
    camp: string;
    school: string;
    chartData: [];
    educationData: any;
};

const initialState: InitialStateType = {
    lessonsData: [],
    isLoading: true,
    country: '',
    camp: '',
    school: '',
    chartData: [],
    educationData: {},
};

// thunk configuration
const apiURL =
    'https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json';

export const getLessonsData = createAsyncThunk('lessons/getLessonsData', () => {
    return fetch(apiURL)
        .then((res) => res.json())
        .catch((err) => console.error(err));
});

const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {
        setLocationDataAction: (state: any, action: any) => {
            state.country = action.payload.countryItem;
            state.camp = action.payload.campItem;
            state.school = action.payload.schoolItem;
        },
        addDataToChartAction: (state: any, action: any) => {
            state.chartData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLessonsData.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(
            getLessonsData.fulfilled,
            (state: any, action: PayloadAction) => {
                state.educationData = getSlicedDataForStore(action.payload);
                state.isLoading = false;
                state.lessonsData = action.payload;
            }
        );
        builder.addCase(getLessonsData.rejected, (state: any) => {
            state.isLoading = false;
        });
    },
});

export const { setLocationDataAction, addDataToChartAction } =
    lessonsSlice.actions;

export default lessonsSlice.reducer;
