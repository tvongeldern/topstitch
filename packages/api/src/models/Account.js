import { db } from '@db';
import { id } from './_fields';


export const Account = db.define(
	'account',
	{
		id,
	},
);
