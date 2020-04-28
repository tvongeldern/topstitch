import { db } from '@db';
import { id, measurement } from './_fields';

export const Measurement = db.define(
	'measurement',
	{
		id,
		average: {
			...measurement,
			allowNull: false,
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
