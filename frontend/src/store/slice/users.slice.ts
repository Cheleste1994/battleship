import { createSlice } from '@reduxjs/toolkit';
import { RegData, RoomsData, WinnersData } from 'src/types/responseWS';
import { RootState } from '../store';

interface UserTable {
  name: string;
  wins: number;
}

export interface UsersState {
  userName: string | null;
  id: number | string | null;
  isLoading: boolean;
  errorMessage: string | null;
  allUsers: UserTable[];
  rooms: RoomsData[];
}

const initialState: UsersState = {
  userName: null,
  isLoading: false,
  errorMessage: null,
  id: null,
  allUsers: [],
  rooms: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: RegData }) => {
      if (payload.error) {
        state.errorMessage = payload.errorText;
        state.userName = null;
        state.id = null;
      } else {
        state.errorMessage = null;
        state.userName = payload.name;
        state.id = payload.index;
      }
    },
    setAllUsers: (state, { payload }: { payload: WinnersData }) => {
      state.allUsers = payload;
    },
    setRooms: (state, { payload }: { payload: RoomsData[] }) => {
      state.rooms = payload;
    },
  },
});

export const getUsersState = (state: RootState) => state.usersReducer;

export const { setUser, setAllUsers, setRooms } = usersSlice.actions;

export default usersSlice.reducer;
