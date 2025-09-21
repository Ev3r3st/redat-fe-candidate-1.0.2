import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'es6-shim';
import { App } from './layout/components/App';
import { store } from './appRedux/store';
import { ErrorBoundary } from './components/ErrorBoundary';

const el = document.querySelector('.root');
if (!el) {
  throw new Error('Root element .root not found');
}
const root = createRoot(el);

root.render(
	<Provider store={store}>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</Provider>
);
