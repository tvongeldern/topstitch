import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import {
	Button,
	Dropdown,
	TextInput,
	RadioLabel,
} from '@components';
import { RETURN_EMPTY_OBJECT } from '@utils';
import { DIVIDER, TYPES_CHAIN, reduceTypesChain } from './typesChain';
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
		formKey,
		presetInputValues = RETURN_EMPTY_OBJECT,
		radioGroups,
	} = TYPES_CHAIN.reduce(
		reduceTypesChain,
		{
			scopedSizechart: sizechart,
			selectedMap,
		},
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

			{/* RADIO GROUPS */}

			<div className={styles.sizechart}>
				{Object.values(radioGroups).map(({
					header,
					radioSelectorBase,
					options,
					formKey,
					getRadioLabel = (obj) => obj[formKey],
				}) => options.length > 0 && (
					<div className={styles.type} key={header}>
						<h3>{header}</h3>
						<div className={styles.list}>
							{options.map(
								(obj) => (
									<Field
										name="selected"
										type="radio"
										value={radioSelectorBase + obj[formKey]}
										label={getRadioLabel(obj, context)}
										component={RadioLabel}
										key={obj[formKey]}
									/>
								)
							)}
						</div>
					</div>
				))}
			</div>

		</form>
	);
}

SizechartForm.propTypes = {
	handleSubmit: func.isRequired,
};
