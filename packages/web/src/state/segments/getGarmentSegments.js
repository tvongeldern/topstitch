import { REDUCE_TO_MAP } from '@utils';

const types = {
	start: 'topstitch.segments.getGarmentSegments.start',
	success: 'topstitch.segments.getGarmentSegments.success',
	fail: 'topstitch.segments.getGarmentSegments.fail',
};

export const getGarmentSegmentsReducer = {
	[types.start]: (state) => state,
	[types.success]: (state, { response }) => ({
		...state,
		segments: REDUCE_TO_MAP(
			response,
			state.segments,
		),
	}),
	[types.fail]: (state, { error }) => ({
		...state,
		error,
	}),
};

export const getGarmentSegments = ({ slug }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get(`/garments/${slug}/segments/`),
});
