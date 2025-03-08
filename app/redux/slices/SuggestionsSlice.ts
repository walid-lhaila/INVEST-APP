import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSuggestions = createAsyncThunk(
    'suggestions/fetchSuggestions',
    async (query, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/ai/suggestions`, {input: query});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something Went Wrong");
        }
    }
);


const suggestionsSlice = createSlice({
    name: 'suggestions',
    initialState: {
        interests: "",
        services: "",
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuggestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSuggestions.fulfilled, (state, action) => {
                state.loading = false;
                const result = action.payload.result;

                try {
                    const interestsMatch = result.match(/Interests: \[(.*?)\]/);
                    const servicesMatch = result.match(/Services: (.*?)\./);

                    state.interests = interestsMatch
                        ? interestsMatch[1].split(',').map(item => item.trim())
                        : [];

                    state.services = servicesMatch
                        ? servicesMatch[1].trim()
                        : "";

                } catch (error) {
                    state.interests = [];
                    state.services = "";
                }
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default suggestionsSlice.reducer;
