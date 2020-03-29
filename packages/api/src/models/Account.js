import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const Account = db.define('Account', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: Sequelize.UUIDV4,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
});
