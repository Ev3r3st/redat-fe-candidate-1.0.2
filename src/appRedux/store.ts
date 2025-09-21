import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { usersListReducer } from "../features/users/usersListSlice";
import { userDetailReducer } from "../features/users/userDetailSlice";

const reducer = combineReducers({
	usersList: usersListReducer,
	userDetail: userDetailReducer,
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware();
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
