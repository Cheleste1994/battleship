import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface GameState {}

const initialState: GameState = {};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
});

export const getUsersState = (state: RootState) => state.usersReducer;

export default gameSlice.reducer;
