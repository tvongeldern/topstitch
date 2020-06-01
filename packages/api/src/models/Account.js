import { db } from '@db';
import { email, id, cognitoId } from './_fields';


export const Account = db.define(
	'account',
	{
		id,
		email: {
			...email,
			allowNull: false,
			unique: true,
		},
		cognitoId,
	},
);

Account.addScope('myself', {
	attributes: ['id', 'email'],
});
