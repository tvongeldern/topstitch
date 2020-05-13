import { UNITS_FACTORS_MAP } from '@constants';
import { FactorParser } from './FactorParser';

export function LengthParser(units) {
	return FactorParser(UNITS_FACTORS_MAP[units])
}
