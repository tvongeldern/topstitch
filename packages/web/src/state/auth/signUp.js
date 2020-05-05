const types = {
	start: 'topstitch.auth.signUp.start',
	success: 'topstitch.auth.signUp.success',
	fail: 'topstitch.auth.signUp.fail',
};

export const signUpReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response: cognitoUser }) => ({
		...state,
		cognitoUser,
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const signUp = ({ email, password, confirm }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ auth }) => auth.signUp({ email, password, confirm })
		.then(() => auth.logIn({ email, password })),
});
