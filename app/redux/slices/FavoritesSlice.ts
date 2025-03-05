import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


interface FavoritesState {
    favorite: null;
    favorites: [];
    isLoading: Boolean;
    error: string | null;
}

const initialState: FavoritesState = {
    favorite: null,
    favorites: [],
    isLoading: false,
    error: null,
}

export const addFavorite = createAsyncThunk(
    'favorites/addFavorite',
    async (postId: string, { rejectWithValue }) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (!storedToken) {
                return rejectWithValue('Authorization token is missing');
            }
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/favorites/add`,
                { postId },
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


export const removeFavorite = createAsyncThunk(
    'favorites/removeFavorite',
    async(favoriteId: string, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization token is missing');
            }
            const response = await axios.delete(`${process.env.EXPO_PUBLIC_BACKEND_URL}/favorites/remove/${favoriteId}`,
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
            .addCase(addFavorite.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorite = action.payload;
                console.log("Updated Favorites:", state.favorites);
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })


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


            .addCase(removeFavorite.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = state.favorites.filter((favorite) => favorite._id !== action.payload._id)
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export default favoritesSlice.reducer;
