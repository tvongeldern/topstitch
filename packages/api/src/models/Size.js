import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';
import Fit from './Fit';

export const Size = db.define('size', {
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
	fit: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: Fit,
			key: 'id',
		},
	},
	privateKey: {
		type: DataTypes.STRING,
	},
});
