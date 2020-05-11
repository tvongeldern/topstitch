import { RETURN_SELF, REMOVE_KEY } from '@utils';

const types = {
	start: 'topstitch.collections.deleteCollection.start',
	success: 'topstitch.collections.deleteCollection.success',
	fail: 'topstitch.collections.deleteCollection.fail',
};

export const deleteCollectionReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { id }) => ({
		...state,
		collections: REMOVE_KEY(id, state.collections),
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const deleteCollection = ({ id }) => ({
	id,
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.delete(`/collections/${id}`),
});
