import { db } from '@db';
import { id, name, slug } from './_commonFields';

export const GarmentType = db.define('garmentType', {
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
