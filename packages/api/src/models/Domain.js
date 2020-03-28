import { DataTypes } from 'sequelize';
import db from '@db';

export const Domain = db.define('Domain', {
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
	},
	host:{
		type: DataTypes.STRING,
		allowNull: false,
	}
});
