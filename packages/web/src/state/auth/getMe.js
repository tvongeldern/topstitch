import { errorActionReducer, RETURN_SELF  } from '@utils';

const types = {
	start: 'topstitch.auth.getMe.start',
	success: 'topstitch.auth.getMe.success',
	fail: 'topstitch.auth.getMe.fail',
};

export const getMeReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response }) => ({
		...state,
		me: response,
	}),
	[types.fail]: errorActionReducer,
};

export const getMe = () => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get('/me/'),
});
