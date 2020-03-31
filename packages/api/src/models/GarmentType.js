import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const GarmentType = db.define('garment_type', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: Sequelize.UUIDV4,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
