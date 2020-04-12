export function errorHandler (
	{
		error = null,
		status = 500,
		message = 'An error has occurred.',
		metadata,
	},
	{ logger = console },
	response,
	next,
) {
	logger.error(error || message);
	return response
		.status(status)
		.send({ error, message, metadata });
}
