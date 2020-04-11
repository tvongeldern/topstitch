import { DataTypes, Sequelize } from 'sequelize';
import { db } from '@db';
import { id } from './_commonFields';


export const Account = db.define(
	'account',
	{
		id,
	},
);
