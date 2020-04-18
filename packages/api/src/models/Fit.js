import { db } from '@db';
import { id, name, tag } from './_fields';

export const Fit = db.define(
	'fit',
	{
		id,
		name,
		tag,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'collectionId'],
			},
			{
				unique: true,
				fields: ['tag', 'collectionId'],
			},
		],
	},
);
