import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'es6-shim';
import { App } from './layout/components/App';
import { store } from './appRedux/store';

const root = createRoot(document.querySelector('.root'));

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
