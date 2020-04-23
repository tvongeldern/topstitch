const types = {
	start: 'seamstress.auth.logIn.start',
	success: 'seamstress.auth.logIn.success',
	fail: 'seamstress.auth.logIn.fail',
};

export const logInReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response: me }) => ({
		...state,
		me,
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const logIn = ({ email, password }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ auth }) => auth.logIn({ email, password }),
});
