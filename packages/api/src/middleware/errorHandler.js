export function errorHandler (
	{
		error = {},
		status = 500,
		message = 'An error has occurred.',
	},
	request,
	response,
	next,
) {
	console.log('\nERROR HANDLER\n', next);
	return response.status(status).send({ error, message });
}
