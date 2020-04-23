export function genericEndpointError({ method }, response, next) {
	return next({
		status: 404,
		message: `${method.toUpperCase()} - Not found`,
	});
}
