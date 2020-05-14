import { UNITS_FACTORS_MAP } from '@constants';
import { FactorParser } from './FactorParser';
import { composeFormatters } from '../formatters';

export function LengthParser(units) {
	return composeFormatters(
		FactorParser(UNITS_FACTORS_MAP[units]),
		Math.round, // since we are parsing to mm, use a round number
	);
}
