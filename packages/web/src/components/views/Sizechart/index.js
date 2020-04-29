import React, { useEffect } from 'react';
import { bool, func, object } from 'prop-types';
import { Field, Form } from 'react-final-form';
import {
	capitalize,
	RETURN_NULL,
	IS_TRUTHY,
} from '@utils';
import { RadioLabel } from './RadioLabel';
import {
	DIVIDER,
	SIZECHART_ATTRIBUTES_CHAIN,
	reduceAttributesChain,
} from './attributesChain';
import styles from './styles.scss';

const RETURN_NAME = ({ name }) => name;

function showAttribute({ attribute, browseMode, members }) {
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
	values: {
		selected = '',
	},
}) {
	const {
		radioGroups: {
			// sizes,
			// measurements,
			...radioGroups
		},
		selectedAttribute,
		selectedObject,
		nameChain,
	} = SIZECHART_ATTRIBUTES_CHAIN.reduce(
		reduceAttributesChain,
		{
			scopedSizechart: { brands: [sizechart] },
			selected,
		},
	);

	useEffect(() => {
		if (
			selected
			// @TODO should not need all these &&s
			// but this is broken when measurmeents are selected
			&& nameChain
			&& selectedAttribute
			&& selectedObject
		) {
			onChange({ 
				displayName: nameChain.filter(IS_TRUTHY).join(' '),
				selectedAttribute: selectedAttribute.slice(0, -1),
				selectedObject,
			});
		}
	}, [selected]);
 
	return (
		<div className={styles.sizechart}>
			{Object.values(radioGroups).map(({
				attribute,
				members,
				getLabel = RETURN_NAME,
				defaultSelected,
			}) => showAttribute({
				attribute,
				browseMode,
				members,
			}) && (
				<div className={styles.type} key={attribute}>
					{!browseMode && <h3>{capitalize(attribute)}</h3>}
					<div className={styles.list}>
						{members.map((member) => (
							<Field
								name="selected"
								type="radio"
								label={getLabel(member)}
								component={RadioLabel}
								value={[attribute, member.id].join(DIVIDER)}
								key={member.id}
								defaultSelected={defaultSelected === member.id}
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
