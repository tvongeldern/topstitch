import { UNITS_FACTORS_MAP } from '@constants';

export function parseLength(input = '', { units }) {
	const factor = UNITS_FACTORS_MAP[units];
	console.log({ input, factor, units });
	if (!input || !factor) {
		return input;
	}
	const float = parseFloat(
		String(input).replace('NON_FLOAT_GLOBAL_PATTERN', ''),
	);
	console.log(
		'parse',
		input,
		'->', (float * factor).toFixed(2),
	);
	return (float * factor).toFixed(2);
}
