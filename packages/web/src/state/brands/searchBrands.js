import { errorActionReducer, REDUCE_TO_MAP, RETURN_SELF  } from '@utils';

const types = {
	start: 'topstitch.brands.searchBrands.start',
	success: 'topstitch.brands.searchBrands.success',
	fail: 'topstitch.brands.searchBrands.fail',
};

export const searchBrandsReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response }) => ({
		...state,
		brands: REDUCE_TO_MAP(
			response,
			state.brands,
		),
	}),
	[types.fail]: errorActionReducer,
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
