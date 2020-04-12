import Umzug from 'umzug';
import { join } from 'path';
import { logger } from './migration-logger';
import { db as sequelize } from './db';

const umzug = new Umzug({
	migrations: {
		// indicates the folder containing the migration .js files
		path: join(__dirname, 'seeders'),
		// inject sequelize's QueryInterface in the migrations
		params: [
			sequelize.getQueryInterface()
		],
	},
	// indicates that the migration data should be store in the database
	// itself through sequelize. The default configuration creates a table
	// named `SequelizeMeta`.
	storage: 'sequelize',
	storageOptions: { sequelize }
})

export async function seed() {
	logger.info('Seeding...');
	await umzug.up();
	logger.success('Seeding completed!');
}
