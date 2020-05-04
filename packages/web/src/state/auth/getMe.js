import { reduceObjectsToMap } from '@utils';

const types = {
	start: 'seamstress.auth.getMe.start',
	success: 'seamstress.auth.getMe.success',
	fail: 'seamstress.auth.getMe.fail',
};

export const getMeReducer = {
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

export const getMe = ({  }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get('/me/'),
});
