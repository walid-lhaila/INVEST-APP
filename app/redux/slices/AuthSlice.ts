import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface UserData {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    fieldOfInterest: string;
    companyName: string;
    companyDescription: string;
    services: string;
}

interface AuthState {
    user: null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
}


export const register = createAsyncThunk(
    'auth/register',
    async(userData: UserData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/Auth/register`, userData);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw  rejectWithValue(error.message || "Something Went Wrong")
        }
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Registration Failed';
            })
    }
})

export default authSlice.reducer;
