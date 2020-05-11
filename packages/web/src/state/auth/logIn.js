import { RETURN_SELF } from '@utils';

const types = {
	start: 'topstitch.auth.logIn.start',
	success: 'topstitch.auth.logIn.success',
	fail: 'topstitch.auth.logIn.fail',
};

export const logInReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response }) => ({
		...state,
		cognitoUser: response,
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
