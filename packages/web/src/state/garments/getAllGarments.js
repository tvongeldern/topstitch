import { errorActionReducer, REDUCE_TO_MAP, RETURN_SELF  } from '@utils';

const types = {
	start: 'topstitch.garments.getAllGarments.start',
	success: 'topstitch.garments.getAllGarments.success',
	fail: 'topstitch.garments.getAllGarments.fail',
};

export const getAllGarmentsReducer = {
	[types.start]: RETURN_SELF,
	[types.success]: (state, { response }) => ({
		...state,
		garments: REDUCE_TO_MAP(response),
	}),
	[types.fail]: errorActionReducer,
};

export const getAllGarments = ({  }) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ api }) => api.get('/garments/'),
});
