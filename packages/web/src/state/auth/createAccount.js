const types = {
	start: 'seamstress.auth.createAccount.start',
	success: 'seamstress.auth.createAccount.success',
	fail: 'seamstress.auth.createAccount.fail',
};

export const createAccountReducer = {
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

export const createAccount = () => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post('/me/'),
});
