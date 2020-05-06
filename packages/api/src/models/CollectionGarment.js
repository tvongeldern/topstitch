import { db } from '@db';
import { id } from './_fields';

export const CollectionGarment = db.define(
	'collectionGarment',
	{ id },
	{
		indexes: [
			{
				unique: true,
				fields: ['collectionId', 'garmentId'],
			},
		],
	},
);
