import React, { useEffect } from 'react';
import { bool, func, object } from 'prop-types';
import { Field, Form } from 'react-final-form';
import { RadioLabel } from '@components/inputs';
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

/**
 * Browse mode filters
 */

function showInBrowseMode({ attribute, members }) {
	const minLength = attribute === 'measurements' ? 0 : 2;
	return members.length >= minLength;
}

function AttributeFilter(browseMode) {
	if (!browseMode) {
		return RETURN_SELF;
	}
	return showInBrowseMode;
}

/**
 * Rendering functions
 */

function renderRow({
	attribute,
	baseValue,
	members,
	getLabel = RETURN_NAME,
	selectedId,
}) {
	return (
		<div className={styles.list} key={attribute}>
			{members.map((member) => (
				<Field
					name="selected"
					type="radio"
					label={getLabel(member)}
					component={RadioLabel}
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
				.filter(AttributeFilter(browseMode))
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
