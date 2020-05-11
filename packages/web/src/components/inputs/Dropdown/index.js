import React from 'react';
import { arrayOf, object, oneOf, string } from 'prop-types';
import { errorActionReducer, getInputErrorState  } from '@utils';
import styles from './styles.scss';

function renderOption(props) {
	return <option {...props} key={props.value} />;
}

export function Dropdown({
	input,
	label,
	meta: {
		error,
		...meta
	},
	options,
	placeholder,
	errors,
	...rest
}) {
	const showError = getInputErrorState(errors, meta);
	return (
		<div className={styles.inputContainer}>
			{label && <label>{label}</label>}
			<select
				{...rest}
				{...input}
			>
				{placeholder && renderOption({ children: placeholder })}
				{options.map(renderOption)}
			</select>
			<p className={styles.error}>{showError ? error : ''}</p>
		</div>
	);
}

Dropdown.propTypes = {
	errors: oneOf(['show', 'hide', 'submit']),
	input: object.isRequired,
	label: string,
	options: arrayOf(object).isRequired,
};

Dropdown.defaultProps = {
	errors: 'submit',
};
