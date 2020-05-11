export function errorActionReducer(state, { error }) {
	return {
		...state,
		error,
	};
}
