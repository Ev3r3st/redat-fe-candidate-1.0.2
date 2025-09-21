import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RequestStatus, User } from './types';

export type UserDetailState = {
  data: User | null;
  status: RequestStatus; // reserved for potential detail fetch
  error: string | null;
};

const initialState: UserDetailState = {
  data: null,
  status: 'idle',
  error: null,
};

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<User | null>) {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { selectUser, clearUser } = userDetailSlice.actions;
export const userDetailReducer = userDetailSlice.reducer;

