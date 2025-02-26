import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice';
import postReducer from './slices/PostSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
