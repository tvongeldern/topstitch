export function composeFormatters(...formatters) {
	return function composedFormatter(string, ...args) {
		return formatters.reduce(
			(formatted, formatter) => formatter(formatted, ...args),
			string,
		);
	}
}
