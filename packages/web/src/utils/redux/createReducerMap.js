/**
 * @param {object} reducers
 * Creates a map of action types
 * and their respective reducer functions
 */
export default function createReducerMap(reducers) {
	return Object.values(reducers)
		.reduce((accumulator, reducer) => ({
			...accumulator,
			...reducer,
	}), {});
}
