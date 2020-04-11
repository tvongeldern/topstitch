import { db } from '@db';
import { id, name, slug } from './_commonFields';

export const Size = db.define(
	'size',
	{
		id,
		name,
		slug,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'fitId'],
			},
			{
				unique: true,
				fields: ['slug', 'fitId'],
			},
		],
	},
);
