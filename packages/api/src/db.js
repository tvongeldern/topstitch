import { Sequelize } from 'sequelize';
import config from '@config';

const db = new Sequelize(config.connectionString);

export default db;
