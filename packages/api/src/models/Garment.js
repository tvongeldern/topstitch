import { db } from '@db';
import { id, name, slug } from './_commonFields';

export const Garment = db.define('garment', {
	id,
	name: {
		...name,
		unique: true,
	},
	slug: {
		...slug,
		unique: true,
	},
});
