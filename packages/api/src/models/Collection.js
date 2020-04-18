import { db } from '@db';
import { id, name, tag } from './_fields';

export const Collection = db.define(
	'collection',
	{
		id,
		name,
		tag,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'brandId'],
			},
			{
				unique: true,
				fields: ['tag', 'brandId'],
			},
		],
	},
);
