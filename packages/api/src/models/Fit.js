import { db } from '@db';
import { id, name } from './_fields';

export const Fit = db.define(
	'fit',
	{
		id,
		name,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'collectionId'],
			},
		],
	},
);
