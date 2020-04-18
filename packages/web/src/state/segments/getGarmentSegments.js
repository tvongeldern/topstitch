const types = {
	start: 'seamstress.segments.getGarmentSegments.start',
	success: 'seamstress.segments.getGarmentSegments.success',
	fail: 'seamstress.segments.getGarmentSegments.fail',
};

export const getGarmentSegmentsReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		segments: {
			...state.segments,
			[seg]: response,
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const getGarmentSegments = ({ slug }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(`/garments/${slug}/segments/`),
});
