import { DataTypes, Sequelize } from 'sequelize';
import { SLUG } from '@constants/patterns';
import { db } from '@db';

const validateNumber = {
	min: {
		args: [1],
		msg: 'Minimum value must be at least 1 millimieter',
	},
	max: {
		args: [9999],
		msg: 'No measurement can be over 10 meters',
	},
};

export const Measurement = db.define(
	'measurement',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
		},
		min: {
			type: DataTypes.SMALLINT,
			allowNull: false,
			validate: validateNumber,
		},
		max: {
			type: DataTypes.SMALLINT,
			allowNull: false,
			validate: validateNumber,
		},
		average: {
			type: DataTypes.SMALLINT,
			validate: validateNumber,
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['segmentId', 'sizeId'],
			},
		],
		validate: {
			minMaxAvgValues() {
				if (this.min > this.max) {
					throw new Error('Measurement maximum must be greater that its minimum');
				}
				if (this.average) {
					if (this.average > this.max) {
						throw new Error('Measurement average must be lower than measurement maximum');
					}
					if (this.average < this.min) {
						throw new Error('Measurement average must be higher than measurement minimum');
					}
				}
			},
		},
	}
);
