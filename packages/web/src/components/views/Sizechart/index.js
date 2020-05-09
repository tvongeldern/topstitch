import React, { useEffect } from 'react';
import { arrayOf, bool, func, object, string } from 'prop-types';
import { Field, Form } from 'react-final-form';
import { RadioLabel } from '@components/inputs';
import { RETURN_NAME, RETURN_NULL } from '@utils';
import { EMPTY_ARRAY } from '@constants';
import {
	DIVIDER,
	SIZECHART_ATTRIBUTES_CHAIN,
	reduceAttributesChain,
} from './attributesChain';
import styles from './styles.scss';

function showAttribute({
	attribute,
	browseMode,
	members,
}) {
	if (!browseMode) {
		return true;
	}
	const minLength = attribute === 'measurements' ? 0 : 2;
	return members.length >= minLength;
}

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

			{Object.values(radioGroups).map(({
				attribute,
				baseValue,
				members,
				getLabel = RETURN_NAME,
				selectedId,
			}) => showAttribute({
				attribute,
				browseMode,
				members,
			}) && (
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

Sizechart.DIVIDER = DIVIDER;
