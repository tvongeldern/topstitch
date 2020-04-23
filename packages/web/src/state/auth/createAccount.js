const types = {
	start: 'seamstress.accounts.createAccount.start',
	success: 'seamstress.accounts.createAccount.success',
	fail: 'seamstress.accounts.createAccount.fail',
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
	promise: ({ api }) => api.post(`/accounts/me`),
});
