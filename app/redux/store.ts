import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice';
import postReducer from './slices/PostSlice';
import userReducer from './slices/UserSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        user: userReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
