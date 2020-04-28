import React, { useEffect } from 'react';
import { bool, func, object } from 'prop-types';
import cn from 'classnames';
import { Field, Form } from 'react-final-form';
import {
	DIVIDER,
	SIZECHART_ATTRIBUTES_CHAIN,
	reduceAttributesChain,
} from './attributesChain';
import styles from './styles.scss';
import {
	capitalize,
	RETURN_NULL,
} from '@utils';

const RETURN_NAME = ({ name }) => name;

function showAttribute({ attribute, browseMode, members }) {
	if (!browseMode) {
		return true;
	}
	const minLength = attribute === 'measurements' ? 0 : 2;
	return members.length >= minLength;
}

function RadioLabel({ input, label, meta, ...props }) {
	return (
		<label {...props} className={cn({ [styles.selected]: input.checked })}>
			<span>{label}</span>
			<input type="radio" {...input} />
		</label>
	)
}

function SizechartForm({
	onChange,
	sizechart,
	browseMode,
	values: {
		selected = '',
	},
}) {

	const {
		radioGroups,
		selectedAttribute,
		selectedObject,
		measurements,
	} = SIZECHART_ATTRIBUTES_CHAIN.reduce(
		reduceAttributesChain,
		{
			scopedSizechart: { brands: [sizechart] },
			selected,
		},
	);

	useEffect(() => {
		if (selected) {
			onChange({ 
				selected: {
					attribute: selectedAttribute.slice(0, -1),
					object: selectedObject,
				},
				measurements,
			});
		}
	}, [selected]);
 
	return (
		<div className={styles.sizechart}>
			{Object.values(radioGroups).map(({
				attribute,
				members,
				selectorKey = 'id',
				getLabel = RETURN_NAME,
			}) => showAttribute({
				attribute,
				browseMode,
				members,
			}) && (
				<div className={styles.type} key={attribute}>
					<h3>{capitalize(attribute)}</h3>
					<div className={styles.list}>
						{members.map((member) => (
							<Field
								name="selected"
								type="radio"
								label={getLabel(member)}
								component={RadioLabel}
								value={[attribute, selectorKey, member[selectorKey]].join(DIVIDER)}
								key={member[selectorKey]}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

SizechartForm.propTypes = {
	browseMode: bool,
	onChange: func,
	sizechart: object.isRequired,
};

SizechartForm.defaultProps = {
	browseMode: false,
	onChange: RETURN_NULL,
};

export function Sizechart(props) {
	return (
		<Form
			component={SizechartForm}
			onSubmit={RETURN_NULL}
			{...props}
		/>
	);
}
