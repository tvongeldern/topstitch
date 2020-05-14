import { UNITS_FACTORS_MAP } from '@constants';
import { composeFormatters } from './composeFormatters';
import { formatFloat } from './formatFloat';
import { FactorFormatter } from './FactorFormatter';

export function LengthFormatter(units) {
	return composeFormatters(
		formatFloat,
		FactorFormatter(UNITS_FACTORS_MAP[units]),
	);
}
