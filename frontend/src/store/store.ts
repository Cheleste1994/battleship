import { configureStore } from '@reduxjs/toolkit';
import fakerUsersReducer from './slice/fakerUsers.slice';

export const store = configureStore({
  reducer: {
    fakerUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
