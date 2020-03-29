import { Logger } from '@utils';

export function provideLogger(request, response, next) {
	const logger = new Logger().context(request.originalUrl);
	request.logger = logger;
	next();
}
