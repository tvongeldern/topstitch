import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const Line = db.define(
	'line',
	{
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
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'brandId'],
			}
		]
	}
);
