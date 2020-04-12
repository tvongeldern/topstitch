import { db } from '@db';
import { id, name, slug } from './_commonFields';

export const Segment = db.define(
	'segment',
	{
		id,
		name,
		slug,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'garmentId'],
			},
			{
				unique: true,
				fields: ['slug', 'garmentId'],
			},
		],
	},
);
