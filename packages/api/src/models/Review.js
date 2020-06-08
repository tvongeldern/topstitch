import { db } from '@db';
import { id, rating, review, thumbRating } from './_fields';

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
		quality: thumbRating,
		shipping: thumbRating,
		sizing: thumbRating,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['accountId', 'sizeId'],
			},
		],
	},
);
