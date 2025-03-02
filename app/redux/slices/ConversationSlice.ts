import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


interface ConversationState {
    conversations: [];
    messages: [];
    conversation: any;
    isLoading: Boolean;
    error: string | null;
}

const initialState: ConversationState = {
    conversations: [],
    messages: [],
    conversation: null,
    isLoading: false,
    error: null,
}


export const getAllConversationByUser = createAsyncThunk (
    'conversation/getAllConversationsByUser',
    async(_, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization token is missing');
            }
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/messages`,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
                );
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.message?.data?.message || 'Something Went Wrong');
        }
    }
);

export const fetchConversationMessages = createAsyncThunk(
    'messages/fetchConversationMessages',
    async (conversationId, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization token is missing');
            }
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/messages/${conversationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
                );
            return response.data.messages;
        } catch (error) {
            return rejectWithValue(error?.message?.data?.message || 'Something Went Wrong');
        }
    }
);

export const fetchConversationById = createAsyncThunk(
    'conversation/fetchConversationById',
    async (conversationId, {rejectWithValue}) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if(!storedToken) {
                return rejectWithValue('Authorization Missing token')
            }
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/messages/conversation/${conversationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
                );
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.message?.data?.message || 'Smething Went Wrong');
        }
    }
);


const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            if(state.conversation) {
                state.conversation.messages.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllConversationByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllConversationByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.conversations = action.payload;
            })
            .addCase(getAllConversationByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchConversationMessages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchConversationMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(fetchConversationMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchConversationById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchConversationById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.conversation = action.payload;
            })
            .addCase(fetchConversationById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
