import { reduceObjectsToMap } from '@utils';

const types = {
	start: 'topstitch.collections.createCollection.start',
	success: 'topstitch.collections.createCollection.success',
	fail: 'topstitch.collections.createCollection.fail',
};

export const createCollectionReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		collections: {
			...state.collections,
			[response.id]: response,
		},
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const createCollection = ({ brandId, name }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/brands/${brandId}/collections/`,
		{ name },
	),
});