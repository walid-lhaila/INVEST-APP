import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
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


export const login = createAsyncThunk(
    'auth/login',
    async(credentials: {username: string; password: string}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/Auth/login`, credentials);
            const {access_token: token, user} = response.data;

            if (!token) {
                return rejectWithValue("No token received");
            }

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            console.log( await AsyncStorage.getItem('token'))
            return {token, user};
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login Failed");
        }
    }
)



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


            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Login Failed";
                state.user = null;
                state.token = null;
            })
    },
});

export default authSlice.reducer;
