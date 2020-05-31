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
	}),
	[types.fail]: errorActionReducer,
};

export const addReview = ({
	size,
	review,
	rating,
	quality,
	sizing,
	shipping,
}) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.post(
		`/sizes/${size}/reviews/`,
		{ review, rating, quality, sizing, shipping }
	),
});
