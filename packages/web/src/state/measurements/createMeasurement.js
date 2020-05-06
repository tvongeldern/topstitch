import { reduceObjectsToMap } from '@utils';

const types = {
	start: 'topstitch.measurements.createMeasurement.start',
	success: 'topstitch.measurements.createMeasurement.success',
	fail: 'topstitch.measurements.createMeasurement.fail',
};

export const createMeasurementReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const createMeasurement = ({  }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(`/`),
});
