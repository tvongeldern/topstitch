import { Sequelize } from 'sequelize';
import { config } from '@constants';

const db = new Sequelize(
	config.connectionString,
	{
		retry: { max: 3 },
		schema: 'public',
	},
);

export { db };
