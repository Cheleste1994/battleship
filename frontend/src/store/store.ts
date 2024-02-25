import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slice/users.slice';
import gameReducer from './slice/game.slice';
import canvasReducer from './slice/canvas.slice';

export const store = configureStore({
  reducer: {
    usersReducer,
    gameReducer,
    canvasReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
