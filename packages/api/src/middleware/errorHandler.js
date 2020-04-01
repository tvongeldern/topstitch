export function errorHandler(
	{
		error = {},
		message = 'An error occurred.',
		status =  500,
	} = {},
	request,
	response,
	next,
) {
	console.log('\nERROR HANDLER\n', next);
	return response.status(status).json({ message, error });
}
