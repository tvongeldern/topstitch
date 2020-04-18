import { db } from '@db';
import {
	measurement,
	id,
	name,
	propName,
} from './_fields';

export const Segment = db.define(
	'segment',
	{
		id,
		name,
		propName,
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
