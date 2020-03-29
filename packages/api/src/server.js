import '@db';
import express from 'express';
import body from 'body-parser';
import cookies from 'cookie-parser';
import routes from '@routes';
import config from '@config';

const ON_READY_STRING = `\nReady! Listening on port ${config.port}.`;

express()
	.use(body.json())
	.use(cookies())
	.use(routes)
	.listen(config.port, () => console.log(ON_READY_STRING));
