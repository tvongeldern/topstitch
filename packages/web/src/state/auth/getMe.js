import { REDUCE_TO_MAP } from '@utils';

const types = {
	start: 'topstitch.auth.getMe.start',
	success: 'topstitch.auth.getMe.success',
	fail: 'topstitch.auth.getMe.fail',
};

export const getMeReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		me: response,
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const getMe = () => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get('/me/'),
});
