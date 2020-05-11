import { RETURN_SELF } from '@utils';

const types = {
	start: 'topstitch.measurements.createMeasurement.start',
	success: 'topstitch.measurements.createMeasurement.success',
	fail: 'topstitch.measurements.createMeasurement.fail',
};

export const createMeasurementReducer = {
	[types.start]: RETURN_SELF,
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

export const createMeasurement = ({
	size: { id },
	segmentId,
	average,
}) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/sizes/${id}/measurements/`,
		{ segmentId, average },
	),
});
