import { RETURN_SELF, REMOVE_KEY } from '@utils';

const types = {
	start: 'topstitch.measurements.deleteMeasurement.start',
	success: 'topstitch.measurements.deleteMeasurement.success',
	fail: 'topstitch.measurements.deleteMeasurement.fail',
};

export const deleteMeasurementReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { id }) => ({
		...state,
		measurements: REMOVE_KEY(id, state.measurements),
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const deleteMeasurement = ({ id }) => ({
	id,
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.delete(`/measurements/${id}`),
});
