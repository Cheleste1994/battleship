import { createSlice } from '@reduxjs/toolkit';
import ControllerGame from 'src/Game/ControllerGame';
import { RootState } from '../store';

export interface CanvasState {
  canvas: HTMLCanvasElement | null;
  gameBoard: ControllerGame | null;
}

const initialState: CanvasState = {
  canvas: null,
  gameBoard: null,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    startGame: (_, { payload }: { payload: CanvasState }) => (payload),
  },
});

export const getStateCanvas = (state: RootState) => state.canvasReducer;

export const { startGame } = canvasSlice.actions;

export default canvasSlice.reducer;
