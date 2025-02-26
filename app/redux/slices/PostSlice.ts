import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface PostState {
    posts: [];
    isLoading: boolean;
    error: string | null
};

const initialState: PostState = {
    posts: [],
    isLoading: false,
    error: null,
}

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/posts/getAll`);
            const posts = response.data;
            const updatedPost = posts.map((post) => {
                return {
                    ...post,
                    imageUrl: post.imageUrl.replace("0.0.0.0", process.env.EXPO_PUBLIC_MINIO_URL),
                }
            })
            return updatedPost;
        } catch (error) {
            return rejectWithValue(error.message || 'something Went Wrong');
        }
    }
);


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});

export default postSlice.reducer;
