import { RETURN_SELF, REMOVE_KEY } from '@utils';

const types = {
	start: 'topstitch.sizes.deleteSize.start',
	success: 'topstitch.sizes.deleteSize.success',
	fail: 'topstitch.sizes.deleteSize.fail',
};

export const deleteSizeReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { id }) => ({
		...state,
		sizes: REMOVE_KEY(id, state.sizes),
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const deleteSize = ({ id }) => ({
	id,
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.delete(`/sizes/${id}`),
});
