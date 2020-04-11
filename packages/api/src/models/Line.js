import { id, name, slug } from './_commonFields';
import { db } from '@db';

export const Line = db.define(
	'line',
	{
		id,
		name,
		slug,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'brandId'],
			},
			{
				unique: true,
				fields: ['slug', 'brandId'],
			},
		],
	},
);
