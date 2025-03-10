import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getTagsAndCategories = createAsyncThunk(
    'tagsAndCategories/generate',
    async(description, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/ai/generateTagsAndCategories`, {description});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something Went Wrong');
        }
    }
);



const tagsAndCategoriesSlice = createSlice({
    name: 'tagsAndCategories',
    initialState: {
        tags: [],
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTagsAndCategories.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getTagsAndCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.tags = action.payload.tags || [];
                state.categories = action.payload.categories || [];
            })
            .addCase(getTagsAndCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});


export default tagsAndCategoriesSlice.reducer;
