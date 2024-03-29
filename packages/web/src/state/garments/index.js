import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	garments: {},
	slugs: {},
};

export const garments = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
