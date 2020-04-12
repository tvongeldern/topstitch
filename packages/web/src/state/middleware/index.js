import {
	applyMiddleware,
	compose,
} from 'redux';
import { asyncActions } from './asyncActions';
import { fileLoader } from './fileLoader';

const middleware = [asyncActions, fileLoader];

function provideOptionsToMiddleware(options) {
	return function apply(middlewareFunction) {
		return applyMiddleware(
			middlewareFunction(options),
		);
	}
}

export function addMiddleware(options) {
	const useMiddleware = provideOptionsToMiddleware(options);
	const appliedMiddleware = middleware.map(useMiddleware);
	return compose(...appliedMiddleware);
}
