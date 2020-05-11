import React from 'react';
import { oneOf } from 'prop-types';
import { errorActionReducer, getInputErrorState  } from '@utils';
import styles from './styles.scss';

export function TextInput({
	input: {
		type = 'text',
		...input
	},
	label,
	meta: {
		error,
		...meta
	},
	errors,
	...rest
}) {
	const showErrorMessage = getInputErrorState(errors, meta);
	return (
		<div className={styles.inputContainer}>
			{label && <label>{label}</label>}
			<input
				type={type}
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
