import createReducerMap from './createReducerMap';
import createReducerFromMap from './createReducerFromMap';

/**
 * @param {module} subreducers
 * @param {object} initialState
 * Creates a reducer function from a map of action types
 * and their respective reducers
 */
export function createReducer(subreducers, initialState) {
	return createReducerFromMap(
		createReducerMap(subreducers),
		initialState,
	);
}
