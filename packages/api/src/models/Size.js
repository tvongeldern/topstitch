import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const Size = db.define('size', {
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
	},
});
