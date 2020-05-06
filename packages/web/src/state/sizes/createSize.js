import { reduceObjectsToMap } from '@utils';

const types = {
	start: 'topstitch.sizes.createSize.start',
	success: 'topstitch.sizes.createSize.success',
	fail: 'topstitch.sizes.createSize.fail',
};

export const createSizeReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const createSize = ({  }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(`/`),
});
