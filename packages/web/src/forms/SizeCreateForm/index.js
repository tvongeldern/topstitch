import React from 'react';
import { func } from 'prop-types';
import { Field } from 'react-final-form';
import { } from '@components/inputs';
import styles from './styles.scss';

export function SizeCreateForm({ handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>

		</form>
	);
}

SizeCreateForm.propTypes = {
	handleSubmit: func.isRequired,
};
