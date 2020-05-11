import { RETURN_SELF } from '@utils';

const types = {
	start: 'topstitch.garments.getGarment.start',
	success: 'topstitch.garments.getGarment.success',
	fail: 'topstitch.garments.getGarment.fail',
};

export const getGarmentReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response }) => ({
		...state,
		slugs: {
			[response.slug]: response.id,
		},
		garments: {
			...state.garments,
			[response.id]: response,
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const getGarment = ({ slug }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(`/garments/${slug}`),
});
