/**
 * Derives a value from a set of existing values
 * @param {func} deriver
 * @param {obj} basis
 * @param {any} defaultValue
 */
export function derive(deriver, basis, defaultValue) {
	if (defaultValue) {
		return defaultValue;
	}
	return deriver(basis);
}
