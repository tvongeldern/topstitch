import { createReducer } from '@utils/redux';
import * as reducers from './_reducers';

const INITIAL_STATE = {
	feed: {},
};

export const client = createReducer(
	reducers,
	INITIAL_STATE,
);

export * from './_actionCreators';
