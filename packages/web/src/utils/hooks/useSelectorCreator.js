import { useSelector } from './useSelector';

export function useSelectorCreator(selectorCreator, ...args) {
	const selector = selectorCreator(...args);
	return useSelector(selector);
}
