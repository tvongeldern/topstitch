import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const Brand = db.define('brand', {
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
		allowNull: false,
		unique: true,
		validate: {
			isLowercase: true,
			isAlphanumeric: true,
		},
	},
});
