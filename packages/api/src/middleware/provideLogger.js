import { Logger  } from '@utils';

export function provideLogger(request, response, next) {
	const logger = new Logger().context(request.originalUrl);
	logger.info(request.method.toUpperCase());
	request.logger = logger;
	next();
}
