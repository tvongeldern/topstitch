import { db } from '@db';
import { id, constrainedNumber } from './_fields';

const measurement = constrainedNumber({
	min: 1,
	max: 9999,
	minMsg: 'All measurements must be at least 1mm',
	maxMsg: 'No measurement can be over 3 meters long',
});

export const Measurement = db.define(
	'measurement',
	{
		id,
		min: {
			...measurement,
			allowNull: false,
		},
		max: {
			...measurement,
			allowNull: false,
		},
		average: measurement,
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
