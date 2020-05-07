import { RETURN_SELF } from '@utils';

const types = {
	start: 'topstitch.auth.logOut.start',
	success: 'topstitch.auth.logOut.success',
	fail: 'topstitch.auth.logOut.fail',
};

export const logOutReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: ({
		cognitoUser,
		me,
		...state
	}) => state,
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const logOut = () => ({
	types: [types.start, types.success, types.fail],
	promise: ({ auth }) => auth.logout(),
});
