import express from 'express';
import routes from '@routes';
import config from '@config';
import '@db';

const app = express();

app.use('/api', routes);

app.listen(config.port, () => {
	console.log(`\nReady! Listening on port ${config.port}.`);
});
