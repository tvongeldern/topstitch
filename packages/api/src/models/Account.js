import { db } from '@db';
import {
	cognitoId,
	email,
	id,
	name,
} from './_fields';


export const Account = db.define(
	'account',
	{
		cognitoId,
		email: {
			...email,
			allowNull: false,
			unique: true,
		},
		id,
		name: {
			...name,
			allowNull: true,
		},
	},
);

Account.addScope('myself', {
	attributes: ['id', 'email', 'name'],
});
