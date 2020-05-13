export function FactorParser(factor) {
	return function formatFactor(value) {
		if (!value) {
			return value;
		}
		return (
			parseFloat(value) * factor
		).toFixed(2);
	}
}
