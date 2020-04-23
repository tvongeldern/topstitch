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

// Paragraphs are long strings with minimal validation attached,
// meant to be helpful to the end user with no value as an index
const paragraph = {
	type: DataTypes.STRING,
};

export const description = paragraph;

export const email = {
	type: DataTypes.STRING,
	validate: {
		isEmail: true,
	},
};

export const uuid = {
	type: DataTypes.UUID,
	defaultValue: Sequelize.UUIDV4,
};

// Unique object identifier
export const id = {
	...uuid,
	primaryKey: true,
	allowNull: false,
	unique: true,
};

// Measurements are always stored in mm
export const measurement = constrainedNumber({
	min: 1,
	max: 9999,
	minMsg: 'All measurements must be at least 1mm',
	maxMsg: 'No measurement can be over 3 meters long',
});

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
