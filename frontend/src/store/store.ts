import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slice/users.slice';
import gameReducer from './slice/game.slice';

export const store = configureStore({
  reducer: {
    usersReducer,
    gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
