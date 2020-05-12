import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	units: 'in',
};

export const auth = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
