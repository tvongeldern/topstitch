import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	Dropdown,
	TextInput,
} from '@components';
import { DIVIDER, Sizechart } from './Sizechart';
import styles from './styles.scss';

// @TODO Should come from redux!!!
const garments = {
	abcdef: {
		id: 'abcdef',
		name: 'T shirt',
	},
	vwxyz: {
		id: 'vwxyz',
		name: 'V Neck',
	},
};

const segments = {
	sd786g: {
		id: 'sd786g',
		garmentId: 'abcdef',
		name: 'Chest width',
	},
	d8g7ds: {
		id: 'd8g7ds',
		garmentId: 'abcdef',
		name: 'Shoulder width',
	},
	gf6hfg: {
		id: 'gf6hfg',
		garmentId: 'vwxyz',
		name: 'Hip width',
	},
};

const mapOption = ([key, { id, name }]) => ({ value: id, children: name });

function getChildProps({
	brand,
	collection,
	garment,
	fit,
	size,
	measurement,
	context,
}) {
	if (!brand) {
		return {
			textInput: {
				label: 'Brand',
			},
			formSelector: 'brands',
			buttonText: 'Add brand',
		};
	}
	if (!collection) {
		return {
			textInput: {
				label: 'Collection',
			},
			formSelector: `brands.${brand}.collections`,
			buttonText: 'Add collection',
		};
	}
	if (!garment) {
		const { garments = {} } = context.sizechart
			.brands[brand]
			.collections[collection];
		return {
			formSelector: `brands.${brand}.collections.${collection}.garments`,
			buttonText: 'Add garment',
			dropDown: {
				label: 'Garment',
				placeholder: 'Select garment',
				options: Object.entries(context.garments)
					.filter(([key]) => !garments[key])
					.map(mapOption),
			},
		};
	}
	if (!fit) {
		return {
			textInput: {
				label: 'Fit',
			},
			formSelector: `brands.${brand}.collections.${collection}.garments.${garment}.fits`,
			buttonText: 'Add fit',
		};
	}
	if (!size) {
		return {
			textInput: {
				label: 'Size',
			},
			formSelector: `brands.${brand}.collections.${collection}.garments.${garment}.fits.${fit}.sizes`,
			buttonText: 'Add size',
		};
	}
	const { measurements = {} } = context.sizechart
		.brands[brand]
		.collections[collection]
		.garments[garment]
		.fits[fit]
		.sizes[size];
	return {
		formSelector: `brands.${brand}.collections.${collection}.garments.${garment}.fits.${fit}.sizes.${size}.measurements`,
		buttonText: measurement ? 'Update measurement' : 'Add measurement',
		formKey: 'segmentId',
		dropDown: {
			label: 'Measurement',
			placeholder: 'Select one',
			options: Object.entries(context.segments)
				.filter(([key, { garmentId }]) => !measurements[key] && garmentId === garment)
				.map(mapOption),
			name: "input.segmentId",
			//
			disabled: measurement,
			defaultValue: measurement
		},
		textInput: {
			label: 'Length',
			name: 'input.mm',
		},
	};
}

export function SizechartForm({
	form,
	handleSubmit,
	values: {
		sizechart = {},
		selected = '',
		...values
	},
}) {
	const [
		brand,
		collection,
		garment,
		fit,
		size,
		measurement,
	] = selected.split(DIVIDER);
	const selectedMap = {
		brand,
		collection,
		garment,
		fit,
		size,
		measurement,
	};

	const {
		formSelector,
		buttonText,
		textInput,
		dropDown,
		formKey = dropDown ? 'id' : 'name',
	} = getChildProps({
		...selectedMap,
		context: {
			garments,
			segments,
			sizechart,
		},
	});

	return (
		<form onSubmit={handleSubmit}>
			{dropDown && (
				<Field
					name="input.id"
					component={Dropdown}
					{...dropDown}
				/>
			)}

			{textInput && (
				<Field
					name="input.name"
					component={TextInput}
					{...textInput}
				/>
			)}

			<Button
				onClick={() => {
					form.change(
						`sizechart.${formSelector}.${values.input[formKey]}`,
						values.input,
					);
					form.change('input', {});
				}}
			>
				{buttonText}
			</Button>

			<Sizechart
				garments={garments}
				segments={segments}
				sizechart={sizechart}
				selected={{
					brand,
					collection,
					garment,
					fit,
					size,
					measurement,
				}}
			/>
		</form>
	);
}

SizechartForm.propTypes = {
	handleSubmit: func.isRequired,
};
