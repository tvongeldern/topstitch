import { db } from '@db';
import { id, name } from './_fields';

export const Collection = db.define(
	'collection',
	{
		id,
		name,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'brandId'],
			},
		],
	},
);
