import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum LocaleEnum {
  'en_US' = 'USA',
  'ru' = 'RU',
  'pl' = 'Poland',
}

export type Locale = keyof typeof LocaleEnum;

export interface UserState {
  index: number;
  uid: string;
  username?: string;
  phone?: string;
  address?: string;
}

export interface FakerUsersState {
  locale: Locale;
  errors: number;
  seed: number;
  page: number;
  usersState: UserState[];
}

const initialState: FakerUsersState = {
  locale: 'en_US',
  errors: 0,
  seed: 0,
  page: 1,
  usersState: [],
};

const fakerUsersSlice = createSlice({
  name: 'fakerUsers',
  initialState,
  reducers: {
  }
});

export const getFakerUsersState = (state: RootState) => state.fakerUsersReducer;

export default fakerUsersSlice.reducer;
