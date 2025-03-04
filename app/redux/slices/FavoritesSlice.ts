import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


interface FavoritesState {
    favorites: [];
    isLoading: Boolean;
    error: string | null;
}

const initialState: FavoritesState = {
    favorites: [],
    isLoading: false,
    error: null,
}

export const getFavoriteByUser = createAsyncThunk(
    'favorites/getFavoritesByUser',
    async(_, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization token is missing');
            }
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/favorites/get`,
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



const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavoriteByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getFavoriteByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = action.payload;
            })
            .addCase(getFavoriteByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
});

export default favoritesSlice.reducer;
