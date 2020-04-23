import { db } from '@db';
import { email, id, uuid } from './_fields';


export const Account = db.define(
	'account',
	{
		id,
		email: {
			...email,
			allowNull: false,
			unique: true,
		},
		cognitoId: {
			...uuid,
			allowNull: false,
		},
	},
);

Account.addScope('myself', {
	attributes: ['id', 'email'],
});
