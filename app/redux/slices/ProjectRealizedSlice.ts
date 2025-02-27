import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface ProjectData {
    title: string;
    description: string;
    tags: string;
    budget: number;
    startDate: Date;
    endDate: Date;
}

interface ProjectState {
    project: null;
    projects: [];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    project: null,
    projects: [],
    isLoading: false,
    error: null,
}

export const createProject = createAsyncThunk(
    'project/createProject',
    async(projectData: ProjectData, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/projects/create`,
                {
                    ...projectData,
                    startDate: new Date(projectData.startDate).toISOString(),
                    endDate: new Date(projectData.endDate).toISOString(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    },
                }
                );
            return response.data
        } catch (error) {
            return rejectWithValue(error?.message || "Something went wrong")
        }
    }
);

export const getAllProjectsByUser = createAsyncThunk (
    'project/getAllProjectByUser',
    async(_, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization token is missing');
            }
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/projects/getAll`,
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


const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.project = action.payload;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })


            .addCase(getAllProjectsByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProjectsByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload;
            })
            .addCase(getAllProjectsByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});
export default projectSlice.reducer;
