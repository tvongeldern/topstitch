import React, { useEffect } from 'react';
import { func } from 'prop-types';
import cn from 'classnames';
import { Field } from 'react-final-form';
import {
	DIVIDER,
	SIZECHART_ATTRIBUTES_CHAIN,
	reduceAttributesChain,
} from './attributesChain';
import styles from './styles.scss';
import {
	capitalize,
	RETURN_EMPTY_OBJECT,
} from '@utils';

const RETURN_NAME = ({ name }) => name;

function RadioLabel({ input, label, meta, ...props }) {
	return (
		<label {...props} className={cn({ [styles.selected]: input.checked })}>
			<span>{label}</span>
			<input type="radio" {...input} />
		</label>
	)
}

export function Sizechart({
	handleSubmit,
	onChange,
	sizechart,
	values: {
		selected = '',
	},
}) {

	const {
		radioGroups,
		selectedAttribute,
		selectedObject,
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
				attribute: selectedAttribute.slice(0, -1),
				object: selectedObject,
			});
		}
	}, [selected]);
 
	return (
		<form className={styles.sizechart} onSubmit={handleSubmit} noValidate>
			{Object.values(radioGroups).map(({
				attribute,
				members,
				selectorKey = 'id',
				getLabel = RETURN_NAME,
			}) => (
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
		</form>
	);
}

Sizechart.propTypes = {
	handleSubmit: func.isRequired,
	onChange: func,
};

Sizechart.defaultProps = {
	onChange: RETURN_EMPTY_OBJECT,
};
