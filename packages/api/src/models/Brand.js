import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const Brand = db.define('brand', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		unique: true,
		defaultValue: Sequelize.UUIDV4,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});
