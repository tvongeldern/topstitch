const MESSAGE = { message: 'Unauthorized' };

export function requireAuth({ account }, response, next) {
	if (!account) {
		return response.status(403).send(MESSAGE);
	}
	return next();
}
