const types = {
	start: 'seamstress.auth.signUp.start',
	success: 'seamstress.auth.signUp.success',
	fail: 'seamstress.auth.signUp.fail',
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
	promise: ({ auth }) => auth.signUp({ email, password, confirm }),
});
