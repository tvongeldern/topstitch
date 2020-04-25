import React from 'react';
import { } from 'prop-types';
import styles from './styles.scss';

export function Checkbox({
	input,
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
				{...rest}
				{...input}
				type="checkbox"
			/>
			<p className={styles.error}>{touched ? error : ''}</p>
		</div>
	);
}

Checkbox.propTypes = {};