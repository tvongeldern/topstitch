import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const Account = db.define('account', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		unique: true,
		defaultValue: Sequelize.UUIDV4,
	},
});
