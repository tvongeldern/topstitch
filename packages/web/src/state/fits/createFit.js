const types = {
	start: 'topstitch.fits.createFit.start',
	success: 'topstitch.fits.createFit.success',
	fail: 'topstitch.fits.createFit.fail',
};

export const createFitReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		fits: {
			...state.fits,
			[response.id]: response,
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const createFit = ({ collectionId, garmentId, name }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/collections/${collectionId}/fits/`,
		{ garmentId, name },
	),
});