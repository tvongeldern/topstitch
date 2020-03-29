import { Sequelize } from 'sequelize';
import config from '@config';

const db = new Sequelize(
	config.connectionString,
	{
		retry: {
			max: 6,
		},
	},
);

export { db };
