import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	sizecharts: {},
};

export const sizecharts = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
