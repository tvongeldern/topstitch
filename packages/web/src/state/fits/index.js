import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	fits: {},
};

export const fits = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
