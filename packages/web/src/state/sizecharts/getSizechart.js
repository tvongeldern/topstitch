import { reduceObjectsToMap } from '@utils';

const types = {
	start: 'seamstress.sizecharts.getSizechart.start',
	success: 'seamstress.sizecharts.getSizechart.success',
	fail: 'seamstress.sizecharts.getSizechart.fail',
};

export const getSizechartReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response, id }) => ({
		...state,
		sizecharts: {
			...state.sizecharts,
			[id]: response,
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const getSizechart = ({ slug, id = slug }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(`/sizecharts/${id}`),
	id,
});
