import React from 'react';
import { oneOf } from 'prop-types';
import { getInputErrorState } from '@utils';
import styles from './styles.scss';

export function TextArea({
	input,
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
			<textarea
				{...rest}
				{...input}
			/>
			<p className={styles.error}>{showErrorMessage ? error : ''}</p>
		</div>
	);
}

TextArea.propTypes = {
	errors: oneOf(['show', 'hide', 'submit']),
};

TextArea.defaultProps = {
	errors: 'submit',
};
