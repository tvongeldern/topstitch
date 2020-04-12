const types = {
	start: 'seamstress.garmentTypes.getGarmentTypes.start',
	success: 'seamstress.garmentTypes.getGarmentTypes.success',
	error: 'seamstress.garmentTypes.getGarmentTypes.error',
};

export const getGarmentTypeReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, action) => ({
		...state,
		action,
	}),
	[types.error]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const getGarmentType = ({ slug }) => ({
	types: [types.start, types.success, types.error],
	promise: ({ api }) => api.get(`/garment-types/${slug}`),
});
