import { errorActionReducer } from '@utils';

const types = {
	start: 'topstitch.auth.createAccount.start',
	success: 'topstitch.auth.createAccount.success',
	fail: 'topstitch.auth.createAccount.fail',
};

export const createAccountReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response: me }) => ({
		...state,
		me,
	}),
	[types.fail]: errorActionReducer,
};

export const createAccount = () => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post('/me/'),
});
