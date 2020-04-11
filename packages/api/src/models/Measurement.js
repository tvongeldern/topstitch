import { DataTypes, Sequelize } from 'sequelize';
import { SLUG } from '@constants/patterns';
import { db } from '@db';

export const Measurement = db.define('measurement', {
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
	slug: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			is: SLUG,
		},
	},
	min: {
		type: DataTypes.SMALLINT,
		allowNull: false,
	},
	max: {
		type: DataTypes.SMALLINT,
		allowNull: false,
	},
	average: {
		type: DataTypes.SMALLINT,
	},
});
