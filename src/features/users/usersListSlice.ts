import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RequestStatus, User } from './types';
import { fetchUsersApi } from './api';

export type UsersListState = {
  items: User[];
  status: RequestStatus;
  error: string | null;
};

const initialState: UsersListState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'usersList/fetchUsers',
  async () => fetchUsersApi()
);

const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.items = action.payload;
    },
    reset(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load users';
      });
  },
});

export const { setUsers, reset } = usersListSlice.actions;
export const usersListReducer = usersListSlice.reducer;
