import {
	errorActionReducer,
	RETURN_SELF,
	REDUCE_TO_MAP,
} from '@utils';

const types = {
	start: 'topstitch.sizes.addReview.start',
	success: 'topstitch.sizes.addReview.success',
	fail: 'topstitch.sizes.addReview.fail',
};

export const addReviewReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response }) => ({
		...state,
		reviews: {
			...state.reviews,
			[response.id]: response,
		},
	}),
	[types.fail]: errorActionReducer,
};

export const addReview = ({
	brand,
	...payload
}) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/brands/${brand}/reviews/`,
		payload,
	),
});
