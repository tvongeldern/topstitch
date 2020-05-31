import React from 'react';
import { oneOf } from 'prop-types';
import { getInputErrorState  } from '@utils';
import styles from './styles.scss';

export function TextInput({
	input,
	label,
	meta: {
		error,
		...meta
	},
	errors,
	...rest
}) {
	const { type } = input;
	const showErrorMessage = getInputErrorState(errors, meta);
	return (
		<div className={styles.inputContainer}>
			{label && <label>{label}</label>}
			<input
				data-lpignore={type !== 'email' && type !== 'password'}
				autoComplete={type === 'email' ? 'on' : 'off'}
				{...rest}
				{...input}
			/>
			<p className={styles.error}>{showErrorMessage ? error : ''}</p>
		</div>
	);
}

TextInput.propTypes = {
	errors: oneOf(['show', 'hide', 'submit']),
};

TextInput.defaultProps = {
	errors: 'submit',
};
