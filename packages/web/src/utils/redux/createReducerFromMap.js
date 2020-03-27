/**
 * @param {object} reducerMap
 * @param {object} initialState
 * Takes a reducer map and converts it into a reducer
 */
export default function createReducerFromMap(reducerMap, initialState) {
	return function reducerFromMap(state = initialState, action) {
		if (reducerMap[action.type]) {
			return reducerMap[action.type](state, action);
		}
		return state;
	};
}
