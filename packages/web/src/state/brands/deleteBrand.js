import { REMOVE_KEY, RETURN_SELF } from '@utils';

const types = {
	start: 'topstitch.brands.deleteBrand.start',
	success: 'topstitch.brands.deleteBrand.success',
	fail: 'topstitch.brands.deleteBrand.fail',
};

export const deleteBrandReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { id }) => ({
		...state,
		brands: REMOVE_KEY(id, state.brands),
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const deleteBrand = ({ id }) => ({
	id,
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.delete(`/brands/${id}`),
});
