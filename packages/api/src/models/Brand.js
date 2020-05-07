import { db } from '@db';
import { id, name, slug, website } from './_fields';

export const Brand = db.define('brand', {
	id,
	name: {
		...name,
		unique: true,
	},
	slug,
	website,
});
