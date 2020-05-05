import { db } from '@db';
import { id, name } from './_fields';

export const Size = db.define(
	'size',
	{
		id,
		name,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'fitId'],
			},
		],
	},
);
