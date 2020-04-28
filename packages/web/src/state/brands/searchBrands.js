import { reduceObjectsToMap } from '@utils';

const types = {
	start: 'seamstress.brands.searchBrands.start',
	success: 'seamstress.brands.searchBrands.success',
	fail: 'seamstress.brands.searchBrands.fail',
};

export const searchBrandsReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		brands: reduceObjectsToMap(
			response,
			state.brands,
		),
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const searchBrands = (q) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(
		`/brands/`,
		{
			params: { q },
		},
	),
});
