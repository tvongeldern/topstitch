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
import config from '@config';

const logger = new Logger().context('startup');

async function onAppReady(...args) {
	logger.success(`API listening on port ${config.port}`);
	logger.log('Connecting to database...');
	await db.authenticate()
		.catch((error) =>  logger.error('Database did not connect.'));
	logger.success('Database connected!');
	logger.log('Running migrations...');
	await db.sync();
	// await migrate(); // switch to migrations once data models have stabilized
	logger.success('Ready!');
}

express()
	.use(body.json())
	.use(cookies())
	.use(provideLogger)
	.use(responseStructure)
	.use(routes)
	.use(errorHandler)
	.listen(config.port, onAppReady);
