import { REDUCE_TO_MAP } from '@utils';

const types = {
	start: 'topstitch.sizes.createSize.start',
	success: 'topstitch.sizes.createSize.success',
	fail: 'topstitch.sizes.createSize.fail',
};

export const createSizeReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		sizes: {
			...state.sizes,
			[response.id]: response,
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const createSize = ({
	fit: { id },
	name,
}) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/fits/${id}/sizes/`,
		{ name },
	),
});
