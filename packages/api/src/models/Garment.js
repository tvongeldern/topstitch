import { db } from '@db';
import { id, name, slug } from './_fields';

/**
 * A garment is a type of clothing,
 * for example, a collared men's shirt
 */
export const Garment = db.define('garment', {
	id,
	name: {
		...name,
		unique: true,
	},
	slug,
});
