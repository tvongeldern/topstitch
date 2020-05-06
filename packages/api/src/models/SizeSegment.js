import { db } from '@db';
import { id } from './_fields';

export const SizeSegment = db.define(
	'sizeSegment',
	{ id },
	{
		indexes: [
			{
				unique: true,
				fields: ['sizeId', 'segmentId'],
			},
		],
	},
);
