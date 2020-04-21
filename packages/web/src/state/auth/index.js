import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	auth: {},
};

export const auth = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
