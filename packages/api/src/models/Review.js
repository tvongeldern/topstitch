import { db } from '@db';
import { id, rating, review } from './_fields';

/**
 * A garment is a type of clothing,
 * for example, a collared men's shirt
 */
export const Review = db.define(
	'review',
	{
		id,
		rating,
		review,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['accountId', 'brandId'],
			},
		],
	},
);
