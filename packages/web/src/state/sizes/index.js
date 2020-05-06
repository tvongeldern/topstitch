import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	sizes: {},
};

export const sizes = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
