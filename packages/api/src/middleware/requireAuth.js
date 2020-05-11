const MESSAGE = { message: 'Unauthorized' };

export function requireAuth({ me }, response, next) {
	if (!me) {
		return response.status(401).send(MESSAGE);
	}
	return next();
}
