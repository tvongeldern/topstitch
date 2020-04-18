const types = {
	start: 'seamstress.garments.getGarment.start',
	success: 'seamstress.garments.getGarment.success',
	fail: 'seamstress.garments.getGarment.fail',
};

export const getGarmentReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		slugs: {
			[response.slug]: response.id,
		},
		garments: {
			...state.garments,
			[response.id]: response,
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const getGarment = ({ slug }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(`/garments/${slug}`),
});
