import express from 'express';
import body from 'body-parser';
import cookies from 'cookie-parser';
import { db, migrate } from '@db';
import {
	provideLogger,
	responseStructure,
	errorHandler,
} from '@middleware';
import routes from '@routes';
import { Logger } from '@utils';
import { config } from '@constants';

const logger = new Logger().context('startup');

(async function startApplication() {
	try {
		logger.log('Connecting to database...');
		await db.authenticate();
		logger.log('Synchronizing tables...');
		// await db.sync();
		await migrate(); // switch to migrations once data models have stabilized
		logger.success('Database ready!');
		try {
			logger.info('Starting API...');
			express()
				.use(body.json())
				.use(cookies())
				.use(provideLogger)
				.use(responseStructure)
				.use(routes)
				.use(errorHandler)
				.listen(config.port, () => logger.success(
					`API listening on port ${config.port}`,
				));
		} catch (error) {
			logger.error('API failed to start up');
		}
	} catch (error) {
		console.error(error);
		logger.error('Database did not connect.');
	}
})();
