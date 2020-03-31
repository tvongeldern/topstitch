import { Sequelize } from 'sequelize';
import config from '@config';

const db = new Sequelize(
	config.connectionString,
	{
		retry: { max: 3 },
		schema: 'public',
	},
);

export { db };
