const types = {
	start: 'topstitch.collections.addGarmentToCollection.start',
	success: 'topstitch.collections.addGarmentToCollection.success',
	fail: 'topstitch.collections.addGarmentToCollection.fail',
};

export const addGarmentToCollectionReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const addGarmentToCollection = ({ id, garmentId }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/collections/${id}/garments/`,
		{ id: garmentId },
	),
	test: console.log({ id, garmentId }),
});
