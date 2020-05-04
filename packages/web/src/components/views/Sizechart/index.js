import React, { useEffect } from 'react';
import { bool, func, object } from 'prop-types';
import { Field, Form } from 'react-final-form';
import { RadioLabel } from '@components/inputs';
import {
	capitalize,
	RETURN_NULL,
	IS_TRUTHY,
} from '@utils';
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

	const { name: sizechartHeader = 'Sizechart' } = sizechart;

	const {
		radioGroups,
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
		if (selected) {
			onChange({ 
				displayName: nameChain.filter(IS_TRUTHY).join(' '),
				selectedAttribute: selectedAttribute.slice(0, -1),
				selectedObject,
			});
		}
	}, [selected]);
 
	return (
		<div className={styles.sizechart}>
			<h3>{sizechartHeader}</h3>

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
				<div className={styles.chainAttribute} key={attribute}>
					{!browseMode && <h3>{capitalize(attribute)}</h3>}
					<div className={styles.list}>
						{members.map((member) => (
							<Field
								name="selected"
								type="radio"
								label={getLabel(member)}
								component={RadioLabel}
								value={[baseValue, member.id].join(DIVIDER)}
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
