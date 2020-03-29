import { DataTypes } from 'sequelize';
import db from '@db';

export const User = db.define('User', {
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
