import {
	errorActionReducer,
	RETURN_SELF,
	REDUCE_TO_MAP,
} from '@utils';

const types = {
	start: 'topstitch.sizecharts.getSizecharts.start',
	success: 'topstitch.sizecharts.getSizecharts.success',
	fail: 'topstitch.sizecharts.getSizecharts.fail',
};

export const getSizechartsReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response }) => ({
		...state,
		sizecharts: REDUCE_TO_MAP(response, state.sizecharts, 'slug'),
	}),
	[types.fail]: errorActionReducer,
};

export const getSizecharts = ({ slugs }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => Promise.all(
		slugs.map(
			(slug) => api.get(`/sizecharts/${slug}`),
		),
	).then((responses) => ({
		data: responses.map(({ data }, index) => ({
			...data,
			slug: slugs[index],
		})),
	})),
});
