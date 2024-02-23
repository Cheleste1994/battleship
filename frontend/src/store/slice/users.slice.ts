import { createSlice } from '@reduxjs/toolkit';
import { RegData } from 'src/types/responseWS';
import { RootState } from '../store';

interface UserTable {
  name: string;
  win: number;
}

export interface UsersState {
  userName: string | null;
  id: number | string | null;
  isLoading: boolean;
  errorMessage: string | null;
  allUsers: UserTable[];
}

const initialState: UsersState = {
  userName: null,
  isLoading: false,
  errorMessage: null,
  id: null,
  allUsers: [],
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
  },
});

export const getUsersState = (state: RootState) => state.usersReducer;

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
