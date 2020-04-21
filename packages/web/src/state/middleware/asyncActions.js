import { Auth, API } from '@utils/clients';

/*
* Redux middleware to handle async actions
*/
export function asyncActions({ req } = {}) {
	// Object provided to async action creators
	const providedPromiseObject = {
		api: API({ req }),
		auth: new Auth({ req }),
	};
	return () => (next) => (action) => {
		const {
			promise,
			types,
			...rest
		} = action;
		// Dispatch standard action objects as-is
		if (!promise || !types) {
			return next(action);
		}
		// Async actions will have an array of 3 types
		// which will always be provided in order
		const [REQUEST, SUCCESS, FAILURE] = types;
		// REQUEST will be dispatched first
		next({ ...rest, type: REQUEST });
		return promise(providedPromiseObject)
			.then(({ data, metadata }) => next({
				...rest,
				response: data,
				metadata,
				type: SUCCESS,
			}))
			.catch((error) => next({
				...rest,
				error,
				type: FAILURE,
			}));
	};
}