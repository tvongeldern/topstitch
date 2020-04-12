import {
	createStore,
	combineReducers,
} from 'redux';
import withRedux from 'next-redux-wrapper';
import { addMiddleware } from './middleware';
import * as reducers from './reducers';

const STORE_OPTIONS = { storeKey: '__store__' };

const reducer = combineReducers(reducers);

function initializeStore(initialState, options) {
	return createStore(
		reducer,
		initialState,
		addMiddleware(options),
	);
}

export function provideStore(App) {
	return withRedux(
		initializeStore,
		STORE_OPTIONS,
	)(App);
}
