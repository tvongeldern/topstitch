import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	measurements: {},
};

export const measurements = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
