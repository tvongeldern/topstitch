export function errorHandler (
	{
		error = {},
		logger = console,
		status = 500,
		message = 'An error has occurred.',
		metadata,
	},
	request,
	response,
	next,
) {
	logger.error(`${message} ${error}`);
	return response
		.status(status)
		.send({ error, message, metadata });
}
