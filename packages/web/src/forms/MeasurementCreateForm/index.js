import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { } from '@components/inputs';
import styles from './styles.scss';

export function MeasurementCreateForm({ handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>

		</form>
	);
}

MeasurementCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
