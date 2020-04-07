import React from 'react';
import { } from 'prop-types';
import styles from './styles.scss';

export function TextInput({
	input,
	label,
	meta: {
		error,
	},
	...rest
}) {
	return (
		<div className={styles.inputContainer}>
			{label && <label>{label}</label>}
			<input type="text" {...input} {...rest} />
			<p>{error}</p>
		</div>
	);
}

TextInput.propTypes = {};