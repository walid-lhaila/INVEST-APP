import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


interface RequestState {
    requests: [];
    isLoading: boolean;
    error: string | null;
}

const initialState: RequestState = {
    requests: [],
    isLoading: false,
    error: null,
}


export const getAllRequest = createAsyncThunk(
    'request/getAllRequest',
    async(_, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization token is misssing');
            }
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/requests/get`,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
                );
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Something Went Wrong');
        }
    }
);


const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRequest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.requests = action.payload;
            })
            .addCase(getAllRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default requestSlice.reducer;
