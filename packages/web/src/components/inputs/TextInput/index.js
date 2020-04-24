import React from 'react';
import { } from 'prop-types';
import styles from './styles.scss';

export function TextInput({
	input: {
		type = 'text',
		...input
	},
	label,
	meta: {
		error,
		touched,
	},
	...rest
}) {
	return (
		<div className={styles.inputContainer}>
			{label && <label>{label}</label>}
			<input
				type={type}
				data-lpignore={type !== 'email' && type !== 'password'}
				{...rest}
				{...input}
			/>
			<p className={styles.error}>{touched ? error : ''}</p>
		</div>
	);
}

TextInput.propTypes = {};