import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice';
import postReducer from './slices/PostSlice';
import userReducer from './slices/UserSlice';
import projectRealizedReducer from './slices/ProjectRealizedSlice'
import conversationReducer from './slices/ConversationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        user: userReducer,
        project: projectRealizedReducer,
        conversation: conversationReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
