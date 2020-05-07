const types = {
	start: 'topstitch.brands.createBrand.start',
	success: 'topstitch.brands.createBrand.success',
	fail: 'topstitch.brands.createBrand.fail',
};

export const createBrandReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		brands: {
			...state.brands,
			[response.id]: response,
		},
		created: response.slug,
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const createBrand = (brand) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post('/brands/', brand),
});
