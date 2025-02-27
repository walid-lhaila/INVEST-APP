import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


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

export const createPosts = createAsyncThunk(
    'posts/createPOst',
    async({postData, file}: {postData: any; file: any}, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization token is missing');
            }
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('description', postData.description);
            formData.append('category', postData.category);
            formData.append('investmentGoal', postData.investmentGoal);
            formData.append('currentInvestment', postData.currentInvestment);
            formData.append('location', postData.location);
            formData.append('tags', postData.tags);
            formData.append('status', postData.status);
            if(file) {
                formData.append('image', {
                    uri: file.uri,
                    type: file.type,
                    name: file.name,
                });
            }


            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/posts/create`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${storedToken}`,
                    },
                }
                );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Something went wrong');
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

            .addCase(createPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default postSlice.reducer;
