import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const reducer = combineReducers({
	// slice.reducer
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware();
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
