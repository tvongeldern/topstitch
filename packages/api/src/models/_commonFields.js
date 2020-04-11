import { DataTypes, Sequelize } from 'sequelize';
import { SLUG } from '@constants/patterns';

export const id = {
	type: DataTypes.UUID,
	primaryKey: true,
	allowNull: false,
	unique: true,
	defaultValue: Sequelize.UUIDV4,
};

export const name = {
	type: DataTypes.STRING,
	allowNull: false,
};

export const slug = {
	type: DataTypes.STRING,
	allowNull: false,
	validate: {
		is: SLUG,
	},
};