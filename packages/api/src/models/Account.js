import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';
import crypto from 'crypto';

console.log(crypto);

export const Account = db.define('account', {
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
