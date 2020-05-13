import { RETURN_SELF } from '@utils';
import { formatNumeric } from './formatNumeric';

export function formatFloat(value) {
	// Probably not the best/most readable code 🤷‍♂️
	const array = String(value)
		.split('.')
		.map(formatNumeric);
	const lastDec = array.pop();
	const leadingUp = array.join('');
	return [leadingUp, lastDec]
		.filter(RETURN_SELF)
		.join('.');
}
