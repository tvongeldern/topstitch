import { db } from '@db';
import { id, name, slug } from './_commonFields';

export const Fit = db.define(
	'fit',
	{
		id,
		name,
		slug,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'collectionId'],
			},
			{
				unique: true,
				fields: ['slug', 'collectionId'],
			},
		],
	},
);
