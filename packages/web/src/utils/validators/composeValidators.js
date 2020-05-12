export function composeValidators(...validators) {
	return function composedValidator(...args) {
		return validators.reduce(
			(errorMsg, validator) => errorMsg || validator(...args),
			null,
		);
	};
}
