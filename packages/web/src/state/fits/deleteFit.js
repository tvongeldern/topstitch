import { RETURN_SELF, REMOVE_KEY } from '@utils';

const types = {
	start: 'topstitch.fits.deleteFit.start',
	success: 'topstitch.fits.deleteFit.success',
	fail: 'topstitch.fits.deleteFit.fail',
};

export const deleteFitReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { id }) => ({
		...state,
		fits: REMOVE_KEY(id, state.fits),
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const deleteFit = ({ id }) => ({
	id,
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.delete(`/fits/${id}`),
});
