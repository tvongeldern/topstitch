import { createReducer } from '@utils/redux';
import { DEFAULT_UNITS } from '@constants';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	units: DEFAULT_UNITS,
};

export const auth = createReducer(reducers, INITIAL_STATE);

export * from './_actionCreators';
