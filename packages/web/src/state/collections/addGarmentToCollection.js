const types = {
	start: 'topstitch.collections.addGarmentToCollection.start',
	success: 'topstitch.collections.addGarmentToCollection.success',
	fail: 'topstitch.collections.addGarmentToCollection.fail',
};

export const addGarmentToCollectionReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { garmentId, id }) => ({
		...state,
		collections: {
			...state.collections,
			[id]: {
				...state.collections[id],
				garments: [
					...state.collections[id]?.garments,
					garmentId,
				],
			},
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const addGarmentToCollection = ({
	collection: { id },
	garmentId,
}) => ({
	id,
	garmentId,
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/collections/${id}/garments/`,
		{ id: garmentId },
	),
});
