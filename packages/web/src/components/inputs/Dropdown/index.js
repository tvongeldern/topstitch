import React from 'react';
import { arrayOf, object, string } from 'prop-types';
import styles from './styles.scss';

function renderOption(props) {
	return <option {...props} key={props.value} />;
}

export function Dropdown({
	input,
	label,
	meta: {
		error,
		touched,
	},
	options,
	defaultOption,
	...rest
}) {
	return (
		<div className={styles.inputContainer}>
			{label && <label>{label}</label>}
			<select
				{...rest}
				{...input}
			>
				{defaultOption && renderOption({ children: defaultOption })}
				{options.map(renderOption)}
			</select>
			<p className={styles.error}>{touched ? error : ''}</p>
		</div>
	);
}

Dropdown.propTypes = {
	options: arrayOf(object).isRequired,
	label: string,
	input: object.isRequired,
};
