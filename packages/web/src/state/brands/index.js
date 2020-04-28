import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	brands: {},
};

export const brands = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
