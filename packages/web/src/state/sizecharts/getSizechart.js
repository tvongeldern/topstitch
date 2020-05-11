import { errorActionReducer, REMOVE_KEY, RETURN_SELF  } from '@utils';

const types = {
	start: 'seamstress.sizecharts.getSizechart.start',
	success: 'seamstress.sizecharts.getSizechart.success',
	fail: 'seamstress.sizecharts.getSizechart.fail',
};

export const getSizechartReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response, id }) => ({
		...state,
		sizecharts: {
			...state.sizecharts,
			[id]: response,
		},
	}),
	[types.fail]: (state, { error, id }) => ({
		...state,
		sizecharts: REMOVE_KEY(id, state.sizecharts),
	}),
};

export const getSizechart = ({ slug, id = slug }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(`/sizecharts/${id}`),
	id,
});
