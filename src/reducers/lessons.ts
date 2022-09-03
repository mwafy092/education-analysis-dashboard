import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type Lessons = {
    id: string;
    month: string;
    camp: string;
    country: string;
    school: string;
    lessons: number;
};

type InitialStateType = {
    lessonsData: Lessons[];
    isLoading: false | true;
    country: string;
    camp: string;
    school: string;
    chartData: [];
};

const initialState: InitialStateType = {
    lessonsData: [],
    isLoading: true,
    country: '',
    camp: '',
    school: '',
    chartData: [],
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
        setLocationData: (state: any, action: any) => {
            state.country = action.payload.selectedCountry;
            state.camp = action.payload.selectedCamp;
            state.school = action.payload.selectedSchool;
        },
        addDataToChart: (state: any, action: any) => {
            state.chartData.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLessonsData.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(
            getLessonsData.fulfilled,
            (state: any, action: PayloadAction) => {
                state.isLoading = false;
                state.lessonsData = action.payload;
            }
        );
        builder.addCase(getLessonsData.rejected, (state: any) => {
            state.isLoading = false;
        });
    },
});

export const { setLocationData, addDataToChart } = lessonsSlice.actions;

export default lessonsSlice.reducer;
