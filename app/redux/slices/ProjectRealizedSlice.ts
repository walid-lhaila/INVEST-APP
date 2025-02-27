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
    isLoading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    project: null,
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
    },
});
export default projectSlice.reducer;
