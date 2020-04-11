import { db } from '@db';
import { id, name, slug } from './_commonFields';

export const GarmentSegment = db.define(
	'garmentSegment',
	{
		id,
		name,
		slug,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'garmentTypeId'],
			},
			{
				unique: true,
				fields: ['slug', 'garmentTypeId'],
			},
		],
	},
);
