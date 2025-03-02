import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCities = createAsyncThunk(
    'cities/fetchCities',
    async(query, {rejectWithValue}) => {
        try {
            const response = await axios.get(`http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=walidlhaila`);
            return response.data.geonames;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const citySlice = createSlice({
    name: 'cities',
    initialState: {
        cities: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCities: (state) => {
            state.cities = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {clearCities} = citySlice.actions;
export default citySlice.reducer;
