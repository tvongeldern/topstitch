import { db } from '@db';
import { id, name, slug } from './_commonFields';

export const Brand = db.define('brand', {
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
