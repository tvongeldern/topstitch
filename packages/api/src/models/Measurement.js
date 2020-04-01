import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const Measurement = db.define('measurement', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: Sequelize.UUIDV4,
	},
});
