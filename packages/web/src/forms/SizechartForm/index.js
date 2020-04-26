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

function getChildProps({
	brand,
	collection,
	garment,
	fit,
	size,
	segment,
	measurement,
	context,
}) {
	if (!brand) {
		return {
			fieldLabel: 'Brand',
			formSelector: 'brands',
			buttonText: 'Add brand',
		};
	}
	if (!collection) {
		return {
			fieldLabel: 'Collection',
			formSelector: `brands.${brand}.collections`,
			buttonText: 'Add collection',
		};
	}
	if (!garment) {
		return {
			fieldLabel: 'Garment',
			formSelector: `brands.${brand}.collections.${collection}.garments`,
			buttonText: 'Add garment',
			inputKey: 'id',
			inputOptions: Object.values(context.garments).map(mapGarmentOption),
		};
	}
	if (!fit) {
		return {
			fieldLabel: 'Fit',
			formSelector: `brands.${brand}.collections.${collection}.garments.${garment}.fits`,
			buttonText: 'Add fit',
		};
	}
	if (!size) {
		return {
			fieldLabel: 'Size',
			formSelector: `brands.${brand}.collections.${collection}.garments.${garment}.fits.${fit}.sizes`,
			buttonText: 'Add size',
		};
	}
	return {
		fieldLabel: 'Segment',
		formSelector: `brands.${brand}.collections.${collection}.garments.${garment}.fits.${fit}.sizes.${size}.segments`,
		buttonText: 'Add Segment',
		inputKey: 'id',
		inputOptions: Object.values(context.segments)
			.filter(({ garmentId }) => garmentId === garment)
			.map(mapGarmentOption),
	};
}

const mapGarmentOption = ({ id, name }) => ({ value: id, children: name });

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
		segment,
		measurement,
	] = selected.split(DIVIDER);
	const selectedMap = {
		brand,
		collection,
		garment,
		fit,
		size,
		segment,
		measurement,
	};

	const {
		fieldLabel,
		formSelector,
		buttonText,
		inputKey = 'name',
		inputOptions,
		hideForm,
	} = getChildProps({
		...selectedMap,
		context: {
			garments,
			segments,
		},
	});

	const inputProps = inputOptions
		? { component: Dropdown, options: inputOptions, defaultOption: 'Select garment' }
		: { component: TextInput };

	return (
		<form onSubmit={handleSubmit}>

			{!hideForm && (
				<div className={styles.form}>
					<Field
						label={fieldLabel}
						name={`input.${inputKey}`}
						{...inputProps}
					/>

					<Button
						onClick={() => {
							form.change(
								`sizechart.${formSelector}.${values.input[inputKey]}`,
								values.input,
							);
							form.change('input', {});
						}}
					>
						{buttonText}
					</Button>
				</div>
			)}

			<Sizechart
				garments={garments}
				sizechart={sizechart}
				selected={{
					brand,
					collection,
					garment,
					fit,
					size,
					segment,
					measurement,
				}}
			/>

		</form>
	);
}

SizechartForm.propTypes = {
	handleSubmit: func.isRequired,
};
