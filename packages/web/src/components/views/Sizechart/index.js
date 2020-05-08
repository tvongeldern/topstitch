import React, { useEffect } from 'react';
import { arrayOf, bool, func, object, string } from 'prop-types';
import { Field, Form } from 'react-final-form';
import { RadioLabel } from '@components/inputs';
import {
	capitalize,
	RETURN_NULL,
} from '@utils';
import { EMPTY_ARRAY } from '@constants';
import {
	DIVIDER,
	SIZECHART_ATTRIBUTES_CHAIN,
	reduceAttributesChain,
} from './attributesChain';
import styles from './styles.scss';

const RETURN_NAME = ({ name }) => name;

function showAttribute({
	attribute,
	browseMode,
	hideRows,
	members,
}) {
	if (hideRows.includes(attribute)) {
		return false;
	}
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
	hideRows,
	values: {
		selected = '',
	},
}) {

	const {
		displayName,
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
				selectedAttribute,
				displayName,
				selectedObject,
			});
		}
	}, [selected]);
 
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
				hideRows,
				members,
			}) && (
				<div className={styles.chainAttribute} key={attribute}>
					{!browseMode && <h3>{capitalize(attribute)}</h3>}
					<div className={styles.list}>
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
				</div>
			))}
		</div>
	);
}

SizechartForm.propTypes = {
	browseMode: bool,
	hideRows: arrayOf(string),
	onChange: func,
	sizechart: object.isRequired,
};

SizechartForm.defaultProps = {
	browseMode: false,
	hideRows: EMPTY_ARRAY,
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
