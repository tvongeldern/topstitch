import Umzug from 'umzug';
import { join } from 'path';
import { Logger } from '@utils';
import { db as sequelize } from './db';

const logger = new Logger().context('DB Migration');

const umzug = new Umzug({
	migrations: {
		// indicates the folder containing the migration .js files
		path: join(__dirname, 'migrations'),
		// inject sequelize's QueryInterface in the migrations
		params: [
			sequelize.getQueryInterface()
		]
	},
	// indicates that the migration data should be store in the database
	// itself through sequelize. The default configuration creates a table
	// named `SequelizeMeta`.
	storage: 'sequelize',
	storageOptions: { sequelize }
})

export async function migrate() {
	logger.info('Beginning migration...');
	await umzug.up();
	logger.success('All migrations performed successfully!');
}
