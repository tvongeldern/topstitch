import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	Dropdown,
	TextInput,
} from '@components';
import { RETURN_EMPTY_OBJECT } from '@utils';
import { DIVIDER, Sizechart } from './Sizechart';
import { TYPES_CHAIN, reduceTypesChain } from './typesChain';
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

	const context = {
		garments,
		segments,
	};

	const {
		formSelector,
		textInput,
		dropDown,
		button,
		formEntryKey,
		presetInputValues = RETURN_EMPTY_OBJECT,
	} = TYPES_CHAIN.reduce(
		reduceTypesChain,
		{ sizechart, selectedMap },
	);
 
	return (
		<form onSubmit={handleSubmit}>
			{dropDown && (
				<Field
					name="input.id"
					component={Dropdown}
					{...dropDown}
					options={dropDown.options({ selectedMap, sizechart, context })}
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
				{...button}
				onClick={() => {
					const formKey = formEntryKey || (dropDown ? 'id' : 'name');
					const inputValues = {
						...presetInputValues({ selectedMap }),
						...values.input,
					};
					form.change(
						`sizechart.${formSelector}.${inputValues[formKey]}`,
						inputValues,
					);
					form.change('input', {});
				}}
			/>
			

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
