import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	collections: {},
};

export const collections = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
