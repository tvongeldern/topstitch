const SEQUELIZE_ERROR_NAMES = [
	'SequelizeValidationError',
	'SequelizeUniqueConstraintError',
];

function deriveErrorStatus({ error }) {
	if (!error) {
		return 500;
	}
	if (error.name === 'SequelizeValidationError') {
		return 400;
	}
	if (error.name === 'SequelizeUniqueConstraintError') {
		return 409;
	}
	return 500;
}

function getMessage({ message }) {
	return message;
}

function deriveErrorMessage({ error, status }) {
	if (status === 404) {
		return 'Resource not found';
	}
	if (!error) {
		return 'An error ocurred.';
	}
	if (error.name === 'SequelizeValidationError') {
		return error.errors?.map(getMessage).join(', ');
	}
	if (error.name === 'SequelizeUniqueConstraintError') {
		const fields = Object.keys(error.fields || {});
		if (fields.length > 1) {
			return `Combination of ${fields.join(' and ')} must be unique.`;
		};
		return error.errors?.map(getMessage).join(', ');
	}
	return 'An error ocurred.';
}

export function errorHandler (
	{
		error,
		status = deriveErrorStatus({ error }),
		message = deriveErrorMessage({ error, status }),
	},
	{ logger = console },
	response,
	next,
) {
	logger.error(error?.name || message);
	return response
		.status(status)
		.send({ message });
}
