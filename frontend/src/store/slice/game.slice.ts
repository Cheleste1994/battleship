import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateGameData, RoomsData } from 'src/types/responseWS';
import { RootState } from '../store';

export interface GameState extends RoomsData {
  isFull: boolean;
}

export const setGameRoom = createAsyncThunk(
  'game/room',
  ({ room }: { room: CreateGameData }, thunkApi): RoomsData => {
    const { usersReducer } = thunkApi.getState() as RootState;

    const findRoom = usersReducer.rooms.find(
      (roomState) => roomState.roomId === room.idGame
    );

    if (findRoom) {
      return {
        roomId: findRoom.roomId,
        roomUsers: [
          {
            index: usersReducer.id || 0,
            name: usersReducer.userName || '',
          },
          {
            index: room.idPlayer,
            name: room.name,
          },
        ],
      };
    }
    return { roomId: 0, roomUsers: [] };
  }
);

const initialState: GameState = {
  isFull: false,
  roomId: 0,
  roomUsers: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setGameRoom.fulfilled, (_, { payload }) => ({
      ...payload,
      isFull: !!payload.roomId,
    }));
  },
});

export const getGameRoomsState = (state: RootState) => state.gameReducer;

export default gameSlice.reducer;
