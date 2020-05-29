import React, { useEffect } from 'react';
import { bool, func, object } from 'prop-types';
import { Field, Form } from 'react-final-form';
import { ButtonRadio } from '@components/inputs';
import {
	RETURN_NAME,
	RETURN_NULL,
	RETURN_SELF,
} from '@utils';
import {
	DIVIDER,
	SIZECHART_ATTRIBUTES_CHAIN,
	reduceAttributesChain,
} from './attributesChain';
import styles from './styles.scss';

function showInBrowseMode({ attribute, members }) {
	const minLength = attribute === 'measurements' ? 0 : 2;
	return members.length >= minLength;
}

function renderRow({
	attribute,
	baseValue,
	members,
	getLabel = RETURN_NAME,
	selectedId,
	units,
}) {
	return (
		<div className={styles.list} key={attribute}>
			{members.map((member) => (
				<Field
					name="selected"
					type="radio"
					label={getLabel(member, units)}
					component={ButtonRadio}
					value={baseValue ? [baseValue, member.id].join(DIVIDER) : member.id}
					key={member.id}
					defaultSelected={selectedId === member.id}
				/>
			))}
		</div>
	);
}


/**
 * Sizechart
 */

function SizechartForm({
	onChange,
	sizechart,
	browseMode,
	header,
	units,
	values: {
		selected = '',
	},
}) {

	const {
		defaultSelected,
		displayName,
		parents,
		radioGroups,
		selectedAttribute,
		selectedObject,
	} = SIZECHART_ATTRIBUTES_CHAIN.reduce(
		reduceAttributesChain,
		{
			scope: { brands: [sizechart] },
			selected,
			units,
		},
	);

	useEffect(() => {
		if (selected) {
			onChange({ 
				defaultSelected,
				displayName,
				parents,
				selectedAttribute,
				selectedObject,
			});
		}
	}, [selected, sizechart]);
 
	return (
		<div className={styles.sizechart}>
			{header && <h3>{header}</h3>}

			{Object.values(radioGroups)
				.filter(browseMode ? showInBrowseMode : RETURN_SELF)
				.map(renderRow)}
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

Sizechart.DIVIDER = DIVIDER;
