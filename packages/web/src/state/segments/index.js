import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	segments: {},
};

export const segments = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
