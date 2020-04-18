import { DataTypes, Sequelize } from 'sequelize';
import { PROP_NAME, SLUG } from '@constants/patterns';

function constrainedNumber({
	min,
	max,
	minMsg = 'Does not meet minimum value',
	maxMsg = 'Exceeds maximum value',
}) {
	return {
		type: DataTypes.SMALLINT,
		validate: {
			min: {
				args: [min],
				msg: minMsg,
			},
			max: {
				args: [max],
				msg: maxMsg,
			}
		},
	};
}

// Unique object identifier
export const id = {
	type: DataTypes.UUID,
	primaryKey: true,
	allowNull: false,
	unique: true,
	defaultValue: Sequelize.UUIDV4,
};

// Human-readable name for an object
export const name = {
	type: DataTypes.STRING,
	allowNull: false,
};

// Name of prop used for front-end rendering
export const propName = {
	type: DataTypes.STRING,
	allowNull: false,
	validate: {
		is: PROP_NAME,
		len: [2, 64],
	},
};

// A unique string that can be used to locate an object,
// designed to be used as the last part of a URL
export const slug = {
	type: DataTypes.STRING,
	allowNull: false,
	unique: true,
	validate: {
		is: SLUG,
		len: [2, 32],
	},
};

// Similar to a slug,
// but is only unique amongst children of its parent object
export const tag = {
	type: DataTypes.STRING,
	allowNull: false,
	unique: true,
	validate: {
		is: SLUG,
		len: [2, 32],
	},
};

// Measurements are always stored in mm
export const measurement = constrainedNumber({
	min: 1,
	max: 9999,
	minMsg: 'All measurements must be at least 1mm',
	maxMsg: 'No measurement can be over 3 meters long',
});
