import React from 'react';
import { object, string } from 'prop-types';
import styles from './styles.scss';

export function RadioLabel({ input, label }) {
	const elementId = `radio-label-${input.name}-${input.value}`;
	return (
		<div className={styles.container}>
			<input type="radio" {...input} id={elementId} />
			<label htmlFor={elementId}>{label || input.value}</label>
		</div>
	);
}

RadioLabel.propTypes = {
	input: object.isRequired,
	label: string,
};

RadioLabel.defaultProps = {
	label: '',
};
