import { useSelector as useReactReduxSelector, shallowEqual } from 'react-redux';

/**
 * Sets shallowEqual as default equalityFn
 * for react-redux's useSelector hook
 * @param {fn} selector 
 * @param {fn} equalityFn 
 */
export function useSelector(
	selector,
	equalityFn = shallowEqual,
) {
	return useReactReduxSelector(
		selector,
		equalityFn,
	);
}
