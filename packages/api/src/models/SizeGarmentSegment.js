import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';

export const SizeGarmentSegment = db.define('sizeGarmentSegment', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		unique: true,
		defaultValue: Sequelize.UUIDV4,
	},
});
