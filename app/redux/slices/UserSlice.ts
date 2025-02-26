import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
    user: any;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
};

export const fetchUserByUsername = createAsyncThunk(
    'user/fetchUserByUsername',
    async (username: string, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/Auth/getUserByUsername`, {
                username,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByUsername.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});


export default userSlice.reducer;
