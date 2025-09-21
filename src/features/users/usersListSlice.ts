import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RequestStatus, User } from './types';

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
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as User[];
    return data;
  }
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

