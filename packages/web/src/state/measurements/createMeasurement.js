const types = {
	start: 'topstitch.measurements.createMeasurement.start',
	success: 'topstitch.measurements.createMeasurement.success',
	fail: 'topstitch.measurements.createMeasurement.fail',
};

export const createMeasurementReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		measurements: {
			...state.measurements,
			[response.id]: response,
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const createMeasurement = ({ sizeId, segmentId, average }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/sizes/${sizeId}/measurements/`,
		{ segmentId, average },
	),
});
