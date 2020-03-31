import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';
import Shape from './Shape';

export const Fit = db.define('fit', {
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
	shape: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: Shape,
			key: 'id',
		},
	},
	privateKey: {
		type: DataTypes.STRING,
	},
});
