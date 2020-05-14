import {
	errorActionReducer,
	LengthParser,
	RETURN_SELF,
} from '@utils';

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
	[types.fail]: errorActionReducer,
};

export const createMeasurement = ({
	size: { id },
	segmentId,
	average,
	units,
}) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/sizes/${id}/measurements/`,
		{
			segmentId,
			average: LengthParser(units)(average),
		},
	),
});
