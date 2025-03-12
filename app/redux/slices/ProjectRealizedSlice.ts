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
    userProjects: [];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    project: null,
    projects: [],
    userProjects: [],
    isLoading: false,
    error: null,
}

export const createProject = createAsyncThunk(
    'project/createProject',
    async(projectData: ProjectData, {rejectWithValue, dispatch}) => {
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
            dispatch(getAllProjectsByUser());
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

export const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (projectId: string, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization is missing');
            }
            const response = await axios.delete(`${process.env.EXPO_PUBLIC_BACKEND_URL}/projects/delete/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
                );
            return projectId;
        } catch (error) {
            return rejectWithValue(error?.response?.date?.message || "Something Went Wrong");
        }
    }
);

export const getProjectByUsername = createAsyncThunk(
    'project/getProjectsByUsername',
    async (username: string, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization token is missing');
            }
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/projects/getAllByUsername/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                },
                );
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Something went wrong');
        }
    },
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


            .addCase(deleteProject.pending, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = true;
                state.projects = state.projects.filter((project) => project._id !== action.payload);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })


            .addCase(getProjectByUsername.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProjectByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userProjects = action.payload;
            })
            .addCase(getProjectByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});
export default projectSlice.reducer;
