import {
	errorActionReducer,
	RETURN_SELF,
} from '@utils';

const types = {
	start: 'topstitch.public.getFeed.start',
	success: 'topstitch.public.getFeed.success',
	fail: 'topstitch.public.getFeed.fail',
};

export const getFeedReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response }) => ({
		...state,
		feed: response,
	}),
	[types.fail]: errorActionReducer,
};

export const getFeed = () => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get('/public/feed'),
});
