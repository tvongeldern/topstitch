import { NON_NUMERIC_GLOBAL_PATTERN } from '@constants';

export function formatNumeric(value = '') {
	return value.replace(NON_NUMERIC_GLOBAL_PATTERN, '');
}
