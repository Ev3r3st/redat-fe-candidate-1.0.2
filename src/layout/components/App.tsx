import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UsersPage } from "../../features/users/components/UsersPage";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<UsersPage />} />
			</Routes>
		</BrowserRouter>
	);
};
