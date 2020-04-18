import { db } from '@db';
import {
	description,
	id,
	name,
	propName,
} from './_fields';

/**
 * A "segment" is a measurable stretch of a garment
 */
export const Segment = db.define(
	'segment',
	{
		id,
		name,
		propName,
		description,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['name', 'garmentId'],
			},
			{
				unique: true,
				fields: ['propName', 'garmentId'],
			},
		],
	},
);
