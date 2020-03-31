import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';
import { Brand } from './Brand';

export const Line = db.define('line', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: Sequelize.UUIDV4,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	slug: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			isLowercase: true,
			isAlphanumeric: true,
		},
	},
	brand: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: Brand,
			key: 'id',
		},
	},
});
