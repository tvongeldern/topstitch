import { db } from '@db';
import { id, name, slug } from './_commonFields';

export const Collection = db.define(
	'collection',
	{
		id,
		name,
		slug,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'lineId'],
			},
			{
				unique: true,
				fields: ['slug', 'lineId'],
			},
		],
	},
);
