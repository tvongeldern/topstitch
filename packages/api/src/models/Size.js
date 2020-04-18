import { db } from '@db';
import { id, name, tag } from './_fields';

export const Size = db.define(
	'size',
	{
		id,
		name,
		tag,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'fitId'],
			},
			{
				unique: true,
				fields: ['tag', 'fitId'],
			},
		],
	},
);
