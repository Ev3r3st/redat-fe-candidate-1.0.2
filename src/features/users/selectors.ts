import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../appRedux/store';

export const selectUsersState = (s: RootState) => s.usersList;
export const selectUserDetailState = (s: RootState) => s.userDetail;

export const selectUsers = createSelector(selectUsersState, (st) => st.items);
export const selectUsersStatus = createSelector(selectUsersState, (st) => st.status);
export const selectUsersError = createSelector(selectUsersState, (st) => st.error);
export const selectSelectedUser = createSelector(selectUserDetailState, (st) => st.data);

