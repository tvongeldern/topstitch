import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';
import Line from './Line';

export const Shape = db.define('shape', {
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
	line: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: Line,
			key: 'id',
		},
	},
	privateKey: {
		type: DataTypes.STRING,
	},
});
